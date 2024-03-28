var mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Font is an object of type
 * { 
 *   category : <string>,
 *   family : <string>, 
 *   rule : <string>,
 *   url : <string>
 * }
 */ 
var fontSchema = new Schema({
      category : String,
      family : String, 
      rule : String, 
      url : String
} );

fontSchema.set('toJSON', {
   transform : function( doc, result, options ) {
      delete result.__v; // mongo internals
   }
} );

var Font = mongoose.model('Font', fontSchema );
module.exports = Font;
