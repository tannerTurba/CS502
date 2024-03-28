var Font = require('./font');
var Level = require('./level');
var Metadata = require('./myMetadata');
var Users = require('./users');
var mongoose = require('mongoose');

async function init() {
    // remove all db documents
    const data = mongoose.connection.db;
    const collections = await data.listCollections().toArray();
    collections
        .map((collection) => collection.name)
        .forEach(async (collectionName) => {
        data.dropCollection(collectionName);
    });

    await Level.init();
    await Font.init();
    await Metadata.init();
    await Users.init();
}

module.exports = { init };