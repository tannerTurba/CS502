var mongoose = require('mongoose');
var User = require('./userModel');
var Message = require('./messageModel');

var directorySchema = mongoose.Schema({
   ownerId : String,
   contacts : [User.schema], 
//    messages : [Message.schema]
});

var Directory = mongoose.model('Directory', directorySchema );
module.exports = Directory;
