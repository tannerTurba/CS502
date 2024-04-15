var mongoose = require('mongoose');
var Food = require('./foodModel');

var messageSchema = mongoose.Schema({
   to : String,
   from : String,
   food : Food.schema,
   quantity : Number, 
   status : String,
   dateSent : Date
});

var Message = mongoose.model('Message', messageSchema );
module.exports = Message;
