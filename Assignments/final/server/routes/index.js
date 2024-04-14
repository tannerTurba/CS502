var express = require('express');
var router = express.Router();
var User = require('./userModel');
var Food = require('./foodModel');
var Nutrients = require('./nutrientsModel');
var ServingSize = require('./servingSizeModel');
var bcrypt = require('bcrypt');

// router.all('*', function(req, res, next) {
//   console.log(req.url);
//   next();
// });

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

router.post('/users/:uid/ingredients/:fid', async ( req, res, next ) => {
  const fid = req.params.fid;
  const quantity = req.body.quantity;

  let food = {};
  if (quantity > 0) {
    await Food.updateOne( { _id: fid }, { quantity : quantity } );
    food = await Food.findById( { _id: fid } );
  }
  else {
    await Food.deleteOne( { _id: fid } );
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

module.exports = router;
