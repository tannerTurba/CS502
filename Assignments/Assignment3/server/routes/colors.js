var Colors = require('./colorsModel');

async function create( guess, fore, word ) {
    return await new Colors( {guess : guess, fore : fore, word : word} ).save();
};

async function getAll() {
    return await Colors.getAll();
}

module.exports = { create, getAll };