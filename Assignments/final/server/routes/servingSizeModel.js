var mongoose = require('mongoose');

var servingSizeSchema = mongoose.Schema({
   uri : String,
   label : String,
   quantity : Number
});

var ServingSize = mongoose.model('ServingSize', servingSizeSchema );
module.exports = ServingSize;
