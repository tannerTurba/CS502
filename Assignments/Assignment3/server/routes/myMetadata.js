var MyMetadata = require('./myMetadataModel');
var Font = require('./fontModel.js');
var Level = require('./levelModel.js');

async function init() {
    let fonts = await Font.find({});
    let levels = await Level.find({});

    console.log(`Fonts = \n${JSON.stringify(fonts)}`);
    console.log(`Levels = \n${JSON.stringify(levels)}`);
    await MyMetadata.create( {fonts : fonts, levels : levels} );
}

async function getAll() {
    // return await Metadata.find().populate(["fonts", "levels"]);
    return await MyMetadata.find();
}

module.exports = { getAll, init };