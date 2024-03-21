var mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* metadata is an object of type
 * { 
 *   fonts : <Font[]>,
 *   levels : <Level[]>,
 *   defaults : <Defaults>
 * }
 */ 
var metadataSchema = new Schema({
      fonts : {
         type: [Schema.Types.Font],
         ref: 'Fonts'
      }, 
      levels : {
         type: [Schema.Types.Level],
         ref: 'Levels'
      }, 
      defaults : {
         type: Schema.Types.Defaults,
         ref: 'Defaults'
      }
} );

metadataSchema.set('toJSON', {
   transform : function( doc, result, options ) {
      delete result.__v; // mongo internals
   }
} );

var Metadata = mongoose.model('Metadata', metadataSchema );
module.exports = Metadata;
