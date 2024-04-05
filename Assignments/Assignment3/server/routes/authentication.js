// var express = require('express');
// var router = express.Router();
// var User = require('./userModel');
// var bcrypt = require('bcrypt');

// router.all('*', function(req, res, next) {
//    console.log(req.method, req.path);
//    next();
//  });
 
// router.post( '/logout', function( req, res, next ) {
//  req.session.regenerate( function(err) { // create a new session id
//     res.send( 'ok' );
//   } );
// });

// router.post( '/login', ( req, res, next ) => {
//   req.session.regenerate( async function( err ) { 
//       let user = await User.find( { email: req.body.email } );
//       if( user && await bcrypt.compare(req.body.password, user.password)) {
//            req.session.user = user;
//            delete user.password;
//            res.json( user );
//         } else {
//            res.status( 403 ).send( 'Error with email/password' );
//         }
//      } );
// } );

// router.get( '/user', function( req, res, next ) {
//    var user = req.session.user;
//    if( user ) {
//       res.json( user );
//    } else {
//       res.status( 403 ).send( 'Forbidden' );
//    }
// } );

// module.exports = router;
