var mongoose = require('mongoose');
var User = require('./userModel');
var Food = require('./foodModel');

var householdSchema = mongoose.Schema({
   members : [User.schema],
   foodIds : [String]
});

var Household = mongoose.model('Household', householdSchema );
module.exports = Household;
