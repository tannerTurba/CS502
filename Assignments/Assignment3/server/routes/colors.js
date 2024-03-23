var Colors = require('./colorsModel');

async function create( guess, fore, word ) {
    return await new Colors( {guess : guess, fore : fore, word : word} ).save();
};

async function getAll() {
    return await Colors.find( {} );
}

async function find( guess, fore, word ) {
    let color = await Colors.findOne( {guess: guess, fore: fore, word: word} );
    if (color !== null) {
        return color._id;
    }
    else {
        let newColor = await create(guess, fore, word);
        return newColor._id;
    }
}

module.exports = { create, getAll, find };