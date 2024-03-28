var mongoose = require('mongoose');
var Defaults = require('./defaultsModel');

/* user is an object of type
 * { 
 *   email : <string>,
 *   password : <string>,
 *   defaults : <Defaults>,
 *   id_ : <string>
 * }
 */ 
var userSchema = mongoose.Schema({
        email : String,
        password : String,
        defaults : {
            type : {
               type: mongoose.Schema.Types.ObjectId,
               ref: Defaults
            }
        }
} );

userSchema.set('toJSON', {
   transform : function( doc, result, options ) {
      delete result.__v; // mongo internals
   }
} );

var User = mongoose.model('User', userSchema );
module.exports = User;
