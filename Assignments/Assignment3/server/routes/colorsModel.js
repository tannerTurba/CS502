var mongoose = require('mongoose');

var colorsSchema = new mongoose.Schema({
   guess : String, 
   fore : String, 
   word : String
});

var Colors = mongoose.model('Colors', colorsSchema );
module.exports = Colors;
