var mongoose = require('mongoose');
const Font = require('./fontModel');
const Level = require('./levelModel');

/* metadata is an object of type
 * { 
 *   fonts : <Font[]>,
 *   levels : <Level[]>,
 * }
 */ 
var metadataSchema = new mongoose.Schema({
   fonts : [Font.schema],
   levels : [Level.schema],
   // fonts : [{
   //    type : mongoose.Schema.Types.ObjectId,
   //    ref : 'Font'
   // }],
   // levels : [{
   //    type : mongoose.Schema.Types.ObjectId,
   //    ref : 'Level'
   // }]
} );

// metadataSchema.set('toJSON', {
//    transform : function( doc, result, options ) {
//       delete result.__v; // mongo internals
//    }
// } );

var MyMetadata = mongoose.model('Metadata', metadataSchema );
module.exports = MyMetadata;
