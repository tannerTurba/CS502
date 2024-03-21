var Defaults = require('./defaultsModel');

async function create(font, level, colors) {
    return await Defaults.create( {font : font, level : level, colors : colors} ).save();
};

async function getAll() {
    return await Defaults.getAll();
}

module.exports = { create, getAll };