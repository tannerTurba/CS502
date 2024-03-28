var mongoose = require('mongoose');

/* Level is an object of type
 * { 
 *   rounds : <number>,
 *   minLength : <number>,
 *   maxLength : <number>,
 *   name : <string>
 * }
 */ 
var levelSchema = new mongoose.Schema({
   rounds : Number, 
   minLength : Number, 
   maxLength : Number, 
   name : String
} );

// levelSchema.set('toJSON', {
//    transform : function( doc, result, options ) {
//       delete result.__v; // mongo internals
//    }
// } );

var Level = mongoose.model('Level', levelSchema );
module.exports = Level;
