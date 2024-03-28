var mongoose = require('mongoose');
const Font = require('./fontModel');
const Level = require('./levelModel');
const Schema = mongoose.Schema;

/* metadata is an object of type
 * { 
 *   fonts : <Font[]>,
 *   levels : <Level[]>,
 * }
 */ 
var metadataSchema = new Schema({
   // fonts : [Font.schema],
   // levels : [Level.schema],
   fonts : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Font'
   }],
   levels : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Level'
   }]
} );

metadataSchema.set('toJSON', {
   transform : function( doc, result, options ) {
      delete result.__v; // mongo internals
   }
} );

var Metadata = mongoose.model('Metadata', metadataSchema );
module.exports = Metadata;
