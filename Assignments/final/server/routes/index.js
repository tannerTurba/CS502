var express = require('express');
var router = express.Router();
var User = require('./userModel');
var Food = require('./foodModel');
var Nutrients = require('./nutrientsModel');
var ServingSize = require('./servingSizeModel');
var Directory = require('./directoryModel');
var Message = require('./messageModel');
var Household = require('./householdModel');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

/* Verifies a session user matches their request data */
router.all('*/users/:uid*', function(req, res, next) {
  var user = req.session.user;
  if (user._id == req.params.uid) {
    next();
  }
  else {
    req.session.regenerate( function(err) { // create a new session id
      req.session.user = null;
    });
  }
});

/* Make call to Edamam food search API and return results */
router.get('/foods', function(req, res, next) {
  const baseUrl = 'https://api.edamam.com/api/food-database/v2';
  const appId = '35b313ca';
  const appKey = '5fe592b84538ad54e7a6d8f45f321e34';
  const nutritionType = 'cooking';
  const keyword = req.query.keyword;

  fetch(`${baseUrl}/parser?app_id=${appId}&app_key=${appKey}&ingr=${keyword}&nutrition-type=${nutritionType}`)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error('Failed to fetch food');
      }
      return resp.json();
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(404).json({ error: error.message });
    });
});

/* Make call to Edamam food stats API and return results */
router.post('/foods/:fid', function(req, res, next) {
  const baseUrl = 'https://api.edamam.com/api/food-database/v2';
  const appId = '35b313ca';
  const appKey = '5fe592b84538ad54e7a6d8f45f321e34';
  const fid = req.params.fid;

  fetch(`${baseUrl}/nutrients?app_id=${appId}&app_key=${appKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "ingredients": [
        {
          "quantity": 1,
          "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_serving",
          "qualifiers": [],
          "foodId": fid
        }
      ]
    })
  })
    .then((resp) => {
      if (!resp.ok) {
        console.log(resp);
        throw new Error('Failed to fetch food details');
      }
      return resp.json();
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

/* logout: Logout user */
router.post('/logout', function(req, res, next) {
  req.session.destroy(() => {
    res.json( 'ok' )
  });
});

/* login: Login user */
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

/* signup: Create user */
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
      u.password = '[REDACTED]';
      res.status(200).json(u);
    }
  });
});

/* modifyAccount: Modify account */
router.post('/users/:uid', async (req, res, next) => {
  const uid = req.params.uid;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  if (firstName !== '') {
    await User.updateOne( {_id: uid}, {firstName: firstName} );
  }
  if (lastName !== '') {
    await User.updateOne( {_id: uid}, {lastName: lastName} );
  }
  if (password !== '') {
    await User.updateOne( {_id: uid}, {password: await bcrypt.hash(password, 10)} );
  }

  let user = await User.findById(uid);
  user.password = "[REDACTED]";
  res.status(200).json(user);
})

/* getUserInfo: Get user details */
router.get('/users/:uid', async (req, res, next) => {
  const uid = req.params.uid;
  let user = await User.findById(uid);
  user.password = "[REDACTED]";
  res.status(200).json(user);
})

/* getUserIngredients: Get user's set of ingredients */
router.get('/users/:uid/ingredients', async (req, res, next) => {
  const uid = req.params.uid;
  const search = req.query.search;
  const page = Number.parseInt(req.query.page) || 1;

  // Calculate pagination details
  let totalFoods = (await Food.find( { userId: uid } )).length;
  const pageLimit = 11;
  const offset = (page - 1) * pageLimit;
  let prevPage = (page - 1) > 0 ? page - 1 : -1;
  let nextPage = (offset + pageLimit) < totalFoods ? page + 1 : -1;

  if (search === "") {
    let ingredients = await Food.find( { userId: uid } )
      .sort( { label: 1 } )
      .skip( offset )
      .limit( pageLimit );

    res.status(200).json({
      food: ingredients,
      prev: prevPage,
      next: nextPage
    });
  }
  else {
    let ingredients = await Food.find( { userId: uid, label:{ $regex: search, $options: "i" }} )
    .sort( { label: 1 } )
    .skip( offset )
    .limit( pageLimit );
    
    res.status(200).json({
      food: ingredients,
      prev: prevPage,
      next: nextPage
    });
  }
});

/* getUserIngredient: get the details for a single ingredient */
router.get('/users/:uid/ingredients/:fid', async (req, res, next) => {
  const uid = req.params.uid;
  const fid = req.params.fid;
  let ingredient = await Food.findOne( { userId: uid, foodId: fid } );
  res.status(200).json(ingredient);
});

/* setQuantity: set the quantity of a user's ingredient */
router.put('/users/:uid/ingredients/:fid', async (req, res, next) => {
  const uid = req.params.uid;
  const fid = req.params.fid;
  let quantity = req.body.quantity;

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

/* addUserIngredient: add an ingredient to the user's set of ingredients */
router.post('/users/:uid/ingredients', async (req, res, next) => {
  const uid = req.params.uid;
  const food = req.body;
  let nutrients = await Nutrients.create( food.nutrients );
  let servingSizes = [];

  // if available, create serving size documents to attact to the new ingredient
  if (food.servingSizes !== undefined) {
    for (let k = 0; k < food.servingSizes.length; k++) {
      let servingSize = food.servingSizes[k];
      servingSizes.push(await ServingSize.create( servingSize ));
    }
  }

  // Create the ingredient document
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

  // Add the ingredient's foodId to the household set
  let user = await User.findById(uid);
  let household = await Household.findById(user.householdId);
  household.foodIds.push(food.foodId);
  await Household.updateOne( {foodIds: household.foodIds} );

  // Return the ingredient in the response
  res.status(200).json(f);
});

/* getMessageDirectory: get all the users that the user has contacted before */
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

// updateMessage: update a message between and user and a contact
router.put('/users/:uid/contacts/:cid/messages/:mid', async (req, res, next) => {
  const mid = req.params.mid;
  const status = req.body.status;
  const quantity = req.body.quantity;

  await Message.updateOne( { _id: mid }, { status: status, quantity: quantity } );
  let message = await Message.findOne( { _id: mid } );
  res.status(200).json(message);
});

// getUserMessages: get all messages between a user and a contact
router.get('/users/:uid/contacts/:cid/messages', async (req, res, next) => {
  const uid = req.params.uid;
  const contactId = req.params.cid;

  let messages = await Message.find({
    $or: [
      { to: uid, from: contactId },
      { to: contactId, from: uid }
    ]
  })
  .sort({ dateSent: 1 });
  res.status(200).json(messages);
});

/* createMessage: add a message to the user's set of messages with a contact */
router.post('/users/:uid/contacts/:cid/messages', async (req, res, next) => {
  const uid = req.params.uid;
  const cid = req.params.cid;
  const foodId = req.body.foodId;
  const quantity = req.body.quantity;
  const user = await User.findById(uid);
  const contact = await User.findById(cid);

  // if needed, update the directory for user and contact
  let dir = await Directory.find( {ownerId: uid, 'contacts._id': cid} );
  if (dir.length === 0) {
    await Directory.updateOne( {ownerId: uid}, {$push: {contacts: contact}} );
  }
  dir = await Directory.find( {ownerId: cid, 'contacts._id': uid} );
  if (dir.length === 0) {
    await Directory.updateOne( {ownerId: cid}, {$push: {contacts: user}} );
  }

  // create the message
  let food = await Food.findOne( {foodId: foodId} );
  let message = await Message.create( {to: cid, from: uid, food: food, quantity: quantity, status: 'active', dateSent: Date.now()} );
  res.status(200).json(message);
});

/* transferIngredient: Transfer the quantity of an ingredient from one user to another */
router.post('/users/:uid/ingredients/:fid', async (req, res, next) => {
  const uid = req.params.uid;
  const fid = req.params.fid;
  const recipient = req.body.transferTo;
  const quantity = req.body.quantity;

  // get the current quantity of the ingredients for both users
  let userFood = await Food.findOne( {foodId: fid, userId: uid} );
  let userQuantity = userFood.quantity;
  let recipientFood = await Food.findOne( {foodId: fid, userId: recipient} );
  let recipientQuantity = 0;
  if (recipientFood !== null) {
    recipientQuantity = recipientFood.quantity;
  }

  // tranfer quantity via basic math
  userQuantity -= quantity;
  recipientQuantity += quantity;

  // update recipient's ingredient
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

  // update user's ingredient
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

/* getHousehold: get household information */
router.get('/users/:uid/households/:hid', async (req, res, next ) => {
  const hid = req.params.hid;
  let household = await Household.findById(hid);
  res.status(200).json(household);
});

/* getSharedFood: get all ingredients in the household */
router.get('/users/:uid/households/:hid/ingredients', async (req, res, next ) => {
  const uid = req.params.uid;
  const hid = req.params.hid;
  const search = req.query.search;

  // aggregate to get all ingredient information for a household
  const result = await Household.aggregate([
    // Match stage to filter household by its _id
    { $match: { _id: mongoose.Types.ObjectId(hid) } },
    // Make cross references
    {
      $lookup: {
        from: 'foods',
        let: { foodIds: '$foodIds' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $in: ['$foodId', '$$foodIds'] },
                  { $regexMatch: { input: "$label", regex: new RegExp(search, "i") } }
                ]
              }
            }
          },
          { $project: { _id: 0, foodId: 1 } }
        ],
        as: 'foods'
      }
    },
    {
      $unwind: '$foods' // Unwind the array of foods
    },
    {
      $group: {
        _id: null,
        foodIds: { $addToSet: '$foods.foodId' } // Accumulate distinct foodIds into an array
      }
    },
    {
      $project: {
        _id: 0,
        foodIds: 1 // Project the foodIds array to return
      }
    }
  ]);

  // Get number of ingredients, otherwise return 
  let totalFoods = 0;
  if (result.length > 0) {
    totalFoods = result[0].foodIds.length;
  } 
  else {
    res.status(200).json([]);
    return;
  }

  // Pagination calculations
  const page = Number.parseInt(req.query.page) || 1;
  const pageLimit = 2;
  const offset = (page - 1) * pageLimit;
  let prevPage = (page - 1) > 0 ? page - 1 : -1;
  let nextPage = (offset + pageLimit) < totalFoods ? page + 1 : -1;

  // Alphanumerically sort ingredients and perform pagination to get single page of ingredients
  const sortAlphaNum = (a, b) => a.localeCompare(b, 'en', { numeric: true });
  let foods = result[0].foodIds;
  foods.sort(sortAlphaNum);
  if (foods.length >= offset) {
    foods = foods.slice(offset, offset + pageLimit);
  }
  else {
    foods = foods.slice(0, pageLimit);
  }

  // Respond with ingredients and pagination links
  res.status(200).json({
    foodIds: foods,
    prev: `${prevPage}`,
    next: `${nextPage}`
  });
});

/* getSharedIngredient: get the user information for all instances of a single ingredient in a household */
router.get('/users/:uid/households/:hid/ingredients/:fid', async (req, res, next) => {
  const hid = req.params.hid;
  const fid = req.params.fid;

  // get all member Ids
  const members = (await Household.findById(hid)).members;
  let mids = [hid];
  for (let i = 0; i < members.length; i++) {
    mids.push(members[i]._id);
  }

  // get ingredients that are by someone in the household
  let foods = await Food.find( { foodId: fid, userId: {$in: mids} } );

  // attach owner's name to ingredient
  let results = [];
  for (let i = 0; i < foods.length; i++) {
    let user = await User.findById(foods[i].userId);
    let owner = '';
    if (owner) {
      owner = `${user.firstName} ${user.lastName}`;
    }
    let f = {
      food: foods[i],
      owner: owner
    }
    results.push(f);
  }

  res.status(200).json(results);
});

/* setSharedIngredient: adds an ingredient to the household group */
router.post('/users/:uid/households/:hid/ingredients/:fid', async (req, res, next) => {
  const hid = req.params.hid;
  const fid = req.params.fid;
  const food = req.body.food;
  let storedFood = await Food.findOne( {foodId: fid, userId: hid} );

  // update or set food in household account
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

/* addMemberToHousehold: Add a user to the group */
router.post('/users/:uid/households/:hid/members', async (req, res, next) => {
  const uid = req.params.uid;
  const hid = req.params.hid;
  const username = req.body.memberUsername;
  let member = await User.findOne( {username: username} );

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

/* removeMemberFromHousehold: Remove a member from the group: Remove a member(UserModel) from a household group */
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

/* reassignAdmin: Make another user and admin: Change admin(uid) to "member" role and change member(mid) to "admin" role */
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

/* createHousehold: Create a household object containing the owner's account in the members field. Set User.role to admin and User.status to JOINED */
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
