var express = require('express');
var router = express.Router();
var User = require('./userModel');
var Food = require('./foodModel');
var Nutrients = require('./nutrientsModel');
var ServingSize = require('./servingSizeModel');
var Directory = require('./directoryModel');
var Message = require('./messageModel');
var Household = require('./householdModel');
var bcrypt = require('bcrypt');

// router.all('*', function(req, res, next) {
//   console.log(req.url);
//   next();
// });

/* Verifies a session user matches their request data */
// router.all('*/users/:uid*', function(req, res, next) {
//   var user = req.session.user;
//   if (user._id == req.params.uid) {
//     next();
//   }
//   else {
//     req.session.regenerate( function(err) { // create a new session id
//       req.session.user = null;
//     });
//   }
// });

router.post('/logout', function(req, res, next) {
  req.session.destroy(() => {
    res.json( 'ok' )
  });
});

router.post('/login', (req, res, next) => {
 req.session.regenerate( async function( err ) { 
    let user = await User.findOne( { username: req.body.username } );
    if( user && await bcrypt.compare(req.body.password, user.password)) {
      req.session.user = user;
      user.password = "[REDACTED]";
      res.json( user );
    } 
    else {
      res.status( 200 ).json( 'Error with username/password' );
    }
  });
});

router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  req.session.regenerate( async function( err ) { 
    let user = await User.findOne( { username: username } );
    if (user !== null) {
      res.status(200).json( 'This username is already taken' );
    }
    else {
      let u = await User.create({
        username: username,
        password: await bcrypt.hash(password, 10),
        firstName: firstName,
        lastName: lastName,
        role: '',
        status: ''
      });
      await Directory.create({
        ownerId: u._id,
        contacts: []
      });
      res.status(200).json(u);
    }
  });
});

router.get('/users/:uid', async (req, res, next) => {
  const uid = req.params.uid;
  let user = await User.findById(uid);
  res.status(200).json(user);
})

router.get('/users/:uid/ingredients', async (req, res, next) => {
  const uid = req.params.uid;
  let ingredients = await Food.find( { userId: uid } );
  res.status(200).json(ingredients);
});

router.get('/users/:uid/ingredients/:fid', async (req, res, next) => {
  const uid = req.params.uid;
  const fid = req.params.fid;
  let ingredient = await Food.findOne( { userId: uid, foodId: fid } );
  res.status(200).json(ingredient);
});

router.put('/users/:uid/ingredients/:fid', async (req, res, next) => {
  const uid = req.params.uid;
  const fid = req.params.fid;
  // const increment = req.query.increment;
  let quantity = req.body.quantity;

  // if (increment === 'true') {
  //   let f = await Food.find( { _id: fid, userId: uid } );
  //   quantity += f.quantity;
  // }

  let food = {};
  if (quantity > 0) {
    await Food.updateOne( { _id: fid, userId: uid }, { quantity : quantity } );
    food = await Food.findById( { _id: fid } );
  }
  else {
    await Food.deleteOne( { _id: fid, userId: uid } );
  }
  res.status(200).json(food);
});

router.post('/users/:uid/ingredients', async (req, res, next) => {
  const uid = req.params.uid;
  const food = req.body;
  let nutrients = await Nutrients.create( food.nutrients );
  let servingSizes = [];
  if (food.servingSizes !== undefined) {
    for (let k = 0; k < food.servingSizes.length; k++) {
      let servingSize = food.servingSizes[k];
      servingSizes.push(await ServingSize.create( servingSize ));
    }
  }

  let f = await Food.create({
    userId: uid,
    foodId: food.foodId,
    label: food.label,
    knownAs: food.knownAs,
    nutrients: nutrients,
    brand: food.brand,
    category: food.category, 
    categoryLabel: food.categoryLabel,
    foodContentsLabel: food.foodContentsLabel,
    image: food.image,
    servingSizes: servingSizes,
    servingsPerContainer: food.servingsPerContainer,
    quantity: food.quantity
  });

  let user = await User.findById(uid);
  let household = await Household.findById(user.householdId);
  household.foodIds.push(food.foodId);
  await Household.updateOne( {foodIds: household.foodIds} );
  res.status(200).json(f);
});

router.get('/users/:uid/messages', async (req, res, next) => {
  const uid = req.params.uid;
  let directory = await Directory.findOne({ ownerId: uid });

  if (directory == null) {
    res.status(200).json('No messages available');
  }
  else {
    res.status(200).json(directory.contacts);
  }
});

// Change to users/uid/contacts/cid/messages/mid
router.put('/users/:uid/messages/:mid', async (req, res, next) => {
  const mid = req.params.mid;
  const status = req.body.status;
  const quantity = req.body.quantity;

  await Message.updateOne( { _id: mid }, { status: status, quantity: quantity } );
  let message = await Message.findOne( { _id: mid } );
  res.status(200).json(message);
});

// Change to users/uid/contacts/cid/messages
router.get('/users/:uid/messages/:contactId', async (req, res, next) => {
  const uid = req.params.uid;
  const contactId = req.params.contactId;

  let messages = await Message.find({
    $or: [
      { to: uid, from: contactId },
      { to: contactId, from: uid }
    ]
  })
  .sort({ dateSent: 1 });
  res.status(200).json(messages);
});

router.post('/users/:uid/contacts/:cid/messages', async (req, res, next) => {
  const uid = req.params.uid;
  const cid = req.params.cid;
  const foodId = req.body.foodId;
  const quantity = req.body.quantity;
  const user = await User.findById(uid);
  const contact = await User.findById(cid);

  let dir = await Directory.find( {ownerId: uid, 'contacts._id': cid} );
  if (dir.length === 0) {
    await Directory.updateOne( {ownerId: uid}, {$push: {contacts: contact}} );
  }

  dir = await Directory.find( {ownerId: cid, 'contacts._id': uid} );
  if (dir.length === 0) {
    await Directory.updateOne( {ownerId: cid}, {$push: {contacts: user}} );
  }

  let food = await Food.findOne( {foodId: foodId} );
  let message = await Message.create( {to: cid, from: uid, food: food, quantity: quantity, status: 'active', dateSent: Date.now()} );
  res.status(200).json(message);
});

router.post('/users/:uid/ingredients/:fid', async (req, res, next) => {
  const uid = req.params.uid;
  const fid = req.params.fid;
  const recipient = req.body.transferTo;
  const quantity = req.body.quantity;

  let userFood = await Food.findOne( {foodId: fid, userId: uid} );
  let userQuantity = userFood.quantity;
  let recipientFood = await Food.findOne( {foodId: fid, userId: recipient} );
  let recipientQuantity = 0;
  if (recipientFood !== null) {
    recipientQuantity = recipientFood.quantity;
  }

  userQuantity -= quantity;
  recipientQuantity += quantity;

  if (recipientQuantity === quantity) {
    await Food.create( { 
      userId: recipient,
      foodId: fid,
      label: userFood.label,
      knownAs: userFood.knownAs,
      nutrients: userFood.nutrients,
      brand: userFood.brand,
      category: userFood.category, 
      categoryLabel: userFood.categoryLabel,
      foodContentsLabel: userFood.foodContentsLabel,
      image: userFood.image,
      servingSizes: userFood.servingSizes,
      servingsPerContainer: userFood.servingsPerContainer,
      quantity: recipientQuantity
     } );
  }
  else {
    await Food.updateOne( { foodId: fid, userId: recipient }, { $set: { quantity: recipientQuantity } });
    await Food.findOne({ foodId: fid, userId: recipient });
  }

  let food = {};
  if (userQuantity > 0) {
    await Food.updateOne( { foodId: fid, userId: uid }, { quantity : userQuantity } );
    food = await Food.findOne( { foodId: fid } );
  }
  else {
    await Food.deleteOne( { foodId: fid, userId: uid } );
  }
  res.status(200).json(food);
});

router.get('/users/:uid/households/:hid', async (req, res, next ) => {
  const hid = req.params.hid;
  let household = await Household.findById(hid);
  res.status(200).json(household);
});

router.get('/users/:uid/households/:hid/ingredients/:fid', async (req, res, next) => {
  const hid = req.params.hid;
  const fid = req.params.fid;

  const members = (await Household.findById(hid)).members;
  let mids = [];
  for (let i = 0; i < members.length; i++) {
    mids.push(members[i]._id);
  }

  let foods = await Food.find( { foodId: fid, userId: {$in: mids} } );
  res.status(200).json(foods);
});

router.post('/users/:uid/households/:hid/ingredients/:fid', async (req, res, next) => {
  const hid = req.params.hid;
  const fid = req.params.fid;
  const food = req.body.food;
  let storedFood = await Food.findOne( {foodId: fid, userId: hid} );

  let ret;
  if (storedFood !== null) {
    ret = await Food.updateOne( {foodId: fid, userId: hid}, {quantity: food.quantity} );
  }
  else {
    ret = await Food.create( { 
      userId: hid,
      foodId: fid,
      label: food.label,
      knownAs: food.knownAs,
      nutrients: food.nutrients,
      brand: food.brand,
      category: food.category, 
      categoryLabel: food.categoryLabel,
      foodContentsLabel: food.foodContentsLabel,
      image: food.image,
      servingSizes: food.servingSizes,
      servingsPerContainer: food.servingsPerContainer,
      quantity: food.quantity
     } );
  }

  let household = await Household.findById(hid);
  if (!household.foodIds.includes(fid)) {
    household.foodIds.push(fid);
    await Household.updateOne( {foodIds: household.foodIds} );
  }
  res.status(200).json(ret);
});

/* Add a user to the group */
router.post('/users/:uid/households/:hid/members', async (req, res, next) => {
  const uid = req.params.uid;
  const hid = req.params.hid;
  const username = req.body.memberUsername;
  let member = await User.findOne( {username: username} );

  // add the user to the contact's directory
  // let sender = await User.findById(uid);
  // let directory = await Directory.findOne( {ownerId: contact._id} );
  // directory.contacts.push(sender);
  // await Directory.updateOne( {ownerId: contact._id}, {contacts: directory.contacts} );

  if (member === null) {
    res.status(200).json(`'${username}' is not a valid username`);
    return;
  }

  if (member.householdId === '' || member.householdId === undefined) {
    await User.updateOne( {_id: member._id}, {householdId: hid, role: "member", status: 'JOINED'} );
    member = await User.findOne( {username: username} );

    let household = await Household.findById(hid);
    household.members.push(member);
    await Household.updateOne( {_id: hid}, {members: household.members} );
    res.status(200).json(household);
  }
  else {
    res.status(200).json(`'${username}' is already a member of a household`);
  }
});

/* Remove a member from the group: Remove a member(UserModel) from a household group */
router.post('/users/:uid/households/:hid/members/:mid', async (req, res, next) => {
  const uid = req.params.uid;
  const hid = req.params.hid;
  const mid = req.params.mid;
  const member = await User.findById(mid);

  let household = {};
  if (member.householdId !== '' && member.householdId !== undefined) {
    household = await Household.findById(hid);

    for (let i = 0; i < household.members.length; i++) {
      let m = household.members[i];
      if (m.username === member.username) {
        household.members.splice(i, 1);
        await Household.updateOne( {_id: hid}, {members: household.members} );
        await User.updateOne( {_id: member._id}, {householdId: "", role: "", status: ""} );
        break;
      }
    }
  }
  res.status(200).json(household);
});

/* Make another user and admin: Change admin(uid) to "member" role and change member(mid) to "admin" role */
router.put('/users/:uid/households/:hid/members/:mid', async (req, res, next) => {
  const uid = req.params.uid;
  const hid = req.params.hid;
  const mid = req.params.mid;

  await User.updateOne( {_id: uid}, {role: 'member'} );
  await User.updateOne( {_id: mid}, {role: 'admin'} );
  await Household.updateOne( {_id: hid, 'members._id': uid}, {'members.$.role': 'member'});
  await Household.updateOne( {_id: hid, 'members._id': mid}, {'members.$.role': 'admin'});
  let household = await Household.findById(hid);

  res.status(200).json(household);
});

/* Create a group: Create a household object containing the owner's account in the members field. Set User.role to admin and User.status to JOINED */
router.post('/users/:uid/households', async (req, res, next) => {
  const uid = req.params.uid;
  const user = await User.findById(uid);
  const foods = await Food.find( {userId: uid} );

  let foodIds = [];
  for (let i = 0; i < foods.length; i++) {
    foodIds.push(foods[i].foodId);
  }
  
  user.role = 'admin';
  user.status = 'JOINED';
  const household = await Household.create({
    members: [user],
    foodIds: foodIds
  });
  await User.updateOne( {_id: uid}, {householdId: household._id, role: 'admin', status: 'JOINED'} );
  res.status(200).json(household);
});

module.exports = router;
