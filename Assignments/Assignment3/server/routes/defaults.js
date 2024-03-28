var Defaults = require('./defaultsModel');
var Colors = require('./colors');
var Font = require('./font');
var Level = require('./level');

async function create(font, level, colors) {
    let dbColor = await Colors.find(colors.guess, colors.fore, colors.word);
    let dbFont = await Font.find(font);
    let dbLevel = await Level.find(level);
    return (await Defaults.create( {font : dbFont, level : dbLevel, colors : dbColor} )).save();
};

async function getAll() {
    return await Defaults.find( {} );
}

module.exports = { create, getAll };