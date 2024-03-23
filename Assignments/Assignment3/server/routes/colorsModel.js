var mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Colors is an object of type
 * { 
 *   guess : <string>,
 *   fore : <string>,
 *   word : <string>
 * }
 */ 
var colorsSchema = new Schema({
        guess : String, 
        fore : String, 
        word : String
} );

colorsSchema.set('toJSON', {
   transform : function( doc, result, options ) {
      delete result.__v; // mongo internals
   }
} );

var Colors = mongoose.model('Colors', colorsSchema );
module.exports = Colors;
