var mongoose = require('mongoose');
var Food = require('./foodModel');

var userSchema = mongoose.Schema({
   username : String,
   password : String,
   firstName : String,
   lastName : String, 
   // food : [Food.schema]
});

var User = mongoose.model('User', userSchema );
module.exports = User;
