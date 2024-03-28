var mongoose = require('mongoose');
const Colors = require('./colorsModel');
const Font = require('./fontModel');
const Level = require('./levelModel');

var gameSchema = new mongoose.Schema({
    userId : String,
    colors : Colors.schema,
    font : Font.schema,
    guesses : String, 
    _id : String, 
    level : Level.schema,
    remaining : Number, 
    status : String, 
    target : String, 
    timestamp : Number, 
    timeToComplete : Number, 
    view : String
});

var Game = mongoose.model('Game', gameSchema );
module.exports = Game;
