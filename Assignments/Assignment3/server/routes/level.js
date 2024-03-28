var Level = require('./levelModel');

let LEVELS = [
    { rounds: 8, minLength: 3, maxLength: 5, name: "Easy"},
    { rounds: 7, minLength: 4, maxLength: 10, name: "Medium"},
    { rounds: 6, minLength: 9, maxLength: 300, name: "Hard"},
];

async function init() {
    LEVELS.forEach(async function(level) {
        await Level.create( {
            rounds : level.rounds, 
            minLength : level.minLength, 
            maxLength : level.maxLength, 
            name : level.name
        } );
    });
}

async function getAll() {
    return await Level.find({});
};

async function getLevel(name) {
    return await Level.findOne({ name : name });
}

module.exports = { init, getAll, getLevel };