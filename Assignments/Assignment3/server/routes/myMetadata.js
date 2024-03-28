var Metadata = require('./myMetadataModel');
var Font = require('./font.js');
var Level = require('./level.js');

async function init() {
    let fonts = await Font.getAll();
    let levels = await Level.getAll();
    await create( fonts, levels );
}

async function create( fonts, levels ) {
    return (new Metadata( {fonts : fonts, levels : levels} )).save();
};

async function getAll() {
    // return await Metadata.find().populate("fonts");
    return await Metadata.find();
}

module.exports = { getAll, init };