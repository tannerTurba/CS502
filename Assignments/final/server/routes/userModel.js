var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
   username : String,
   password : String,
   firstName : String,
   lastName : String, 
   role: String,
   status: String,
   householdId: String
});

var User = mongoose.model('User', userSchema );
module.exports = User;
