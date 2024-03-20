// var mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// /* Game is an object of type
//  * { 
//  *   userId : <string>,
//  *   colors : <Colors>,
//  *   font : <Font>,
//  *   guesses : <string>,
//  *   _id : <string>,
//  *   level : <Level>,
//  *   remaining : <number>,
//  *   status : <string>,
//  *   target : <string>,
//  *   timestamp : <number>,
//  *   timeToComplete : <number>,
//  *   view : <string>
//  * }
//  */ 
// var gameSchema = new Schema({
//         userId : String,
//         colors : {
//             type: Schema.Types.Colors,
//             ref: 'Colors'
//         },
//         font : {
//             type: Schema.Types.Font, 
//             ref: 'Font'
//         },
//         guesses : String, 
//         _id : String, 
//         level : {
//             type: Schema.Types.Level,
//             ref: 'Level'
//         },
//         remaining : Number, 
//         status : String, 
//         target : String, 
//         timestamp : Number, 
//         timeToComplete : Number, 
//         view : String
// } );

// gameSchema.set('toJSON', {
//    transform : function( doc, result, options ) {
//       delete result.__v; // mongo internals
//    }
// } );

// var Game = mongoose.model('Game', gameSchema );
// module.exports = Game;
