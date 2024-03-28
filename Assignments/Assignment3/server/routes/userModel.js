var mongoose = require('mongoose');
var Defaults = require('./defaultsModel');

var userSchema = mongoose.Schema({
   email : String,
   password : String,
   defaults : Defaults.schema
});

var User = mongoose.model('User', userSchema );
module.exports = User;
