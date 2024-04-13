var mongoose = require('mongoose');

var nutrientsSchema = mongoose.Schema({
   calories : Number, 
   protein : Number,
   fat : Number,
   carbohydrates : Number, 
   fiber : Number
});

var Nutrients = mongoose.model('Nutrients', nutrientsSchema );
module.exports = Nutrients;
