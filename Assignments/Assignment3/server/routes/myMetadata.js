var Metadata = require('./metadataModel');
var Font = require('font.js');
var Level = require('level.js');

async function init() {
    let metaCount = await Metadata.countDocuments();
    if (metaCount === 0) {
        let fonts = await Font.getAll();
        let levels = await Level.getAll();

        await create(
            // fonts.map(font => font._id),
            // levels.map(level => level._id)
            fonts, levels
        );
    }
}

async function create( fonts, levels ) {
    return (await Metadata.create( {fonts : fonts, levels : levels} )).save();
};

async function getAll() {
    await init();
    return await Metadata.getAll();
}

module.exports = { getAll };