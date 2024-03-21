var mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Defaults is an object of type
 * { 
 *   font : <Font>,
 *   level : <Level>,
 *   colors : <Colors>
 * }
 */ 
var defaultsSchema = new Schema({
        font : {
            type: Schema.Types.Font,
            ref: 'Font'
        }, 
        level : {
            type: Schema.Types.Level,
            ref: 'Level'
        }, 
        colors : {
            type: Schema.Types.Colors,
            ref: 'Colors'
        }
} );

defaultsSchema.set('toJSON', {
   transform : function( doc, result, options ) {
      delete result.__v; // mongo internals
   }
} );

var Defaults = mongoose.model('Defaults', defaultsSchema );
module.exports = Defaults;
