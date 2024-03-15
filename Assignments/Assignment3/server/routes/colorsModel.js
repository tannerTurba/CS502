var mongoose = require('mongoose');

/* Colors is an object of type
 * { 
 *   guess : <string>,
 *   fore : <string>,
 *   word : <string>
 * }
 */ 
var colorsSchema = mongoose.Schema({
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
