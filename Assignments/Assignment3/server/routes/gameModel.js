var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Colors = require('./colorsModel');
const Font = require('./fontModel');
const Level = require('./levelModel');

/* Game is an object of type
 * { 
 *   userId : <string>,
 *   colors : <Colors>,
 *   font : <Font>,
 *   guesses : <string>,
 *   _id : <string>,
 *   level : <Level>,
 *   remaining : <number>,
 *   status : <string>,
 *   target : <string>,
 *   timestamp : <number>,
 *   timeToComplete : <number>,
 *   view : <string>
 * }
 */ 
var gameSchema = new Schema({
        userId : String,
        colors : {
            type: {
                type: Schema.Types.ObjectId,
                ref: Colors
            }
        },
        font : {
            type: {
                type: Schema.Types.ObjectId, 
                ref: Font
            }
        },
        guesses : String, 
        _id : String, 
        level : {
            type: {
                type: Schema.Types.ObjectId,
                ref: Level
            }
        },
        remaining : Number, 
        status : String, 
        target : String, 
        timestamp : Number, 
        timeToComplete : Number, 
        view : String
} );

gameSchema.set('toJSON', {
   transform : function( doc, result, options ) {
      delete result.__v; // mongo internals
   }
} );

var Game = mongoose.model('Game', gameSchema );
module.exports = Game;
