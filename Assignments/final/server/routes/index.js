var express = require('express');
var router = express.Router();
var User = require('./userModel');
var Food = require('./foodModel');
var Nutrients = require('./nutrientsModel');
var ServingSize = require('./servingSizeModel');
var Directory = require('./directoryModel');
var Message = require('./messageModel');
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

router.post('/logout', function( req, res, next ) {
  req.session.destroy(() => {
    res.json( 'ok' )
  });
});

router.post('/login', ( req, res, next ) => {
 req.session.regenerate( async function( err ) { 
     let user = await User.findOne( { username: req.body.username } );
     if( user && await bcrypt.compare(req.body.password, user.password)) {
          req.session.user = user;
          user.password = "[REDACTED]";
          res.json( user );
       } else {
          res.status( 200 ).json( 'Error with username/password' );
       }
    } );
} );

router.get('/users/:uid/ingredients', async ( req, res, next ) => {
  const uid = req.params.uid;
  let ingredients = await Food.find( { userId: uid } );
  res.status(200).json(ingredients);
});

router.get('/users/:uid/ingredients/:fid', async ( req, res, next ) => {
  const uid = req.params.uid;
  const fid = req.params.fid;
  let ingredient = await Food.findOne( { userId: uid, foodId: fid } );
  res.status(200).json(ingredient);
});

router.put('/users/:uid/ingredients/:fid', async ( req, res, next ) => {
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

router.post('/users/:uid/ingredients', async ( req, res, next ) => {
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
  res.status(200).json(f);
});

router.get('/users/:uid/messages', async ( req, res, next ) => {
  const uid = req.params.uid;
  let directory = await Directory.findOne({ ownerId: uid });
  res.status(200).json(directory.contacts);
});

router.put('/users/:uid/messages/:mid', async ( req, res, next ) => {
  const mid = req.params.mid;
  const status = req.body.status;
  const quantity = req.body.quantity;

  await Message.updateOne( { _id: mid }, { status: status, quantity: quantity } );
  let message = await Message.findOne( { _id: mid } );
  res.status(200).json(message);
});

router.get('/users/:uid/messages/:contactId', async ( req, res, next ) => {
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

router.post('/users/:uid/ingredients/:fid', async ( req, res, next ) => {
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

module.exports = router;
