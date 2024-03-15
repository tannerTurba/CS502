var express = require('express');
var router = express.Router();
var users = require('./users.js');
var bcrypt = require('bcrypt');

router.post( '/logout', function( req, res, next ) {
 req.session.regenerate( function(err) { // create a new session id
    res.json( { msg : 'ok' } );
  } );
});

router.post( '/login', ( req, res, next ) => {
  req.session.regenerate( async function( err ) { 
      let user = await users.findByEmail( req.body.email );
      let hashedPwd = bcrypt.hash(req.body.password);
      if( user && user.password == hashedPwd ) {
           req.session.user = user;
           delete user.password;
           res.json( user );
        } else {
           res.status( 403 ).send( 'Error with email/password' );
        }
     } );  
} );

router.get( '/user', function( req, res, next ) {
   var user = req.session.user;
   if( user ) {
      res.json( user );
   } else {
      res.status( 403 ).send( 'Forbidden' );
   }
} );

module.exports = router;
