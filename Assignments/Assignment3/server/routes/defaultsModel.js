var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Font = require('./fontModel');
var Level = require('./levelModel');
var Colors = require('./colorsModel');

/* Defaults is an object of type
 * { 
 *   font : <Font>,
 *   level : <Level>,
 *   colors : <Colors>
 * }
 */ 
var defaultsSchema = new Schema({
        font : {
            type : {
                type: Schema.Types.ObjectId,
                ref: Font
            }
        }, 
        level : {
            type: {
                type: Schema.Types.ObjectId,
                ref: Level
            }
        }, 
        colors : {
            type : {
                type: Schema.Types.ObjectId,
                ref: Colors
            }
        }
} );

defaultsSchema.set('toJSON', {
   transform : function( doc, result, options ) {
      delete result.__v; // mongo internals
   }
} );

var Defaults = mongoose.model('Defaults', defaultsSchema );
module.exports = Defaults;
