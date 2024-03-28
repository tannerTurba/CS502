var mongoose = require('mongoose');
const Font = require('./fontModel');
const Level = require('./levelModel');

var metadataSchema = new mongoose.Schema({
   fonts : [Font.schema],
   levels : [Level.schema]
} );

var MyMetadata = mongoose.model('Metadata', metadataSchema );
module.exports = MyMetadata;
