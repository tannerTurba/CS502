var mongoose = require('mongoose');

var levelSchema = new mongoose.Schema({
   rounds : Number, 
   minLength : Number, 
   maxLength : Number, 
   name : String
} );

var Level = mongoose.model('Level', levelSchema );
module.exports = Level;
