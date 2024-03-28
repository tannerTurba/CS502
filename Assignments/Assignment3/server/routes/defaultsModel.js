var mongoose = require('mongoose');
var Font = require('./fontModel');
var Level = require('./levelModel');
var Colors = require('./colorsModel');

var defaultsSchema = new mongoose.Schema({
    font : Font.schema, 
    level : Level.schema, 
    colors : Colors.schema
});

var Defaults = mongoose.model('Defaults', defaultsSchema );
module.exports = Defaults;
