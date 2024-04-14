var mongoose = require('mongoose');

var nutrientsSchema = mongoose.Schema({
   ENERC_KCAL : Number, 
   PROCNT : Number,
   FAT : Number,
   CHOCDF : Number, 
   FIBTG : Number
});

var Nutrients = mongoose.model('Nutrients', nutrientsSchema );
module.exports = Nutrients;
