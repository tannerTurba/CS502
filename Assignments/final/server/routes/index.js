var express = require('express');
var router = express.Router();
var User = require('./userModel');
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

router.post( '/logout', function( req, res, next ) {
  req.session.destroy(() => {
    res.json( 'ok' )
  });
});

router.post( '/login', ( req, res, next ) => {
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

module.exports = router;
