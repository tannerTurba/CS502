var Font = require('./fontModel.js');
var Level = require('./levelModel.js');
var MyMetadata = require('./myMetadataModel.js');
var Colors = require('./colorsModel.js');
var Defaults = require('./defaultsModel.js');
var User = require('./userModel.js');
var mongoose = require('mongoose');

let LEVELS = [
    { rounds: 8, minLength: 3, maxLength: 5, name: "Easy"},
    { rounds: 7, minLength: 4, maxLength: 10, name: "Medium"},
    { rounds: 6, minLength: 9, maxLength: 300, name: "Hard"},
];

let FONTS = [
    { category: "sans-serif", family: "Protest Riot", rule: "protest-riot-regular", url: "https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap" },
    { category: "sans-serif", family: "Roboto", rule: "roboto-regular", url: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" },
    { category: "serif", family: "Noto Serif", rule: "noto-serif-regular", url: "https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap" }
];

let DEFAULT_COLOR = { guess: "#fefae0", fore: "#283618", word: "#9aac5d" };

async function initLevels() {
    for (let i = 0; i < LEVELS.length; i++) {
        let level = LEVELS[i];
        await Level.create( {
            rounds : level.rounds, 
            minLength : level.minLength, 
            maxLength : level.maxLength, 
            name : level.name
        } );
    }
}

async function initFonts() {
    for (let i = 0; i < FONTS.length; i++) {
        let font = FONTS[i];
        await Font.create({
            category : font.category, 
            family : font.family, 
            rule : font.rule, 
            url : font.url
        });
    }
}

async function initMetadata() {
    let levels = await Level.find({});
    let fonts = await Font.find({});
    await MyMetadata.create( {fonts: fonts, levels: levels} );
}

async function initUsers() {
    let color = await Colors.create(DEFAULT_COLOR);
    let font = await Font.findOne( { rule: 'protest-riot-regular' } );
    let level = await Level.findOne( { name: 'Easy' } );
    let defaults = await Defaults.create( { level: level, font: font, colors: color } );

    const userDb = [["bilbo@mordor.org", "111111111"], ["frodo@mordor.org", "222222222"], ["samwise@mordor.org", "333333333"]].map( info => {
            return new User( {
                    email : info[0],
                    password : info[1],
                    defaults : defaults
                } );
            });

    return await User.insertMany( userDb );
};

async function init() {
    // remove all db documents
    const data = mongoose.connection.db;
    const collections = await data.listCollections().toArray();
    let names = collections.map((collection) => collection.name);
    for (let i = 0; i < names.length; i++) {
        await data.dropCollection(names[i]);
    }

    await initLevels();
    await initFonts();
    await initMetadata();
    await initUsers();
}

module.exports = { init };