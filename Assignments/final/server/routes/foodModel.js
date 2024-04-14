var mongoose = require('mongoose');
var Nutrients = require('./nutrientsModel');
var ServingSize = require('./servingSizeModel');

var foodSchema = mongoose.Schema({
   userId : String,
   label : String,
   knownAs : String,
   nutrients : Nutrients.schema,
   brand : String, 
   category : String, 
   categoryLabel : String, 
   foodContentsLabel : String,
   image : String, 
   servingSizes : [ServingSize.schema],
   servingsPerContainer : Number,
   quantity : Number
});

var Food = mongoose.model('Food', foodSchema );
module.exports = Food;
