var mongoose = require('mongoose');

var fontSchema = new mongoose.Schema({
   category : String,
   family : String, 
   rule : String, 
   url : String
} );

var Font = mongoose.model('Font', fontSchema );
module.exports = Font;
