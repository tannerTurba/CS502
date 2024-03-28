var mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Level is an object of type
 * { 
 *   rounds : <number>,
 *   minLength : <number>,
 *   maxLength : <number>,
 *   name : <string>
 * }
 */ 
var levelSchema = new Schema({
      rounds : Number, 
      minLength : Number, 
      maxLength : Number, 
      name : String
} );

levelSchema.set('toJSON', {
   transform : function( doc, result, options ) {
      delete result.__v; // mongo internals
   }
} );

var Level = mongoose.model('Level', levelSchema );
module.exports = Level;
