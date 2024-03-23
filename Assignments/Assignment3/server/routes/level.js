var Level = require('./levelModel');

let LEVELS = [
    { rounds: 8, minLength: 3, maxLength: 5, name: "Easy"},
    { rounds: 7, minLength: 4, maxLength: 10, name: "Medium"},
    { rounds: 6, minLength: 9, maxLength: 300, name: "Hard"},
];

async function init() {
    let levelCount = await Level.countDocuments();
    if (levelCount === 0) {
        LEVELS.forEach(level => {
            create(level.rounds, level.minLength, level.maxLength, level.name);
        });
    }
}

async function create(rounds, minLength, maxLength, name) {
    return await new Level( {rounds : rounds, minLength : minLength, maxLength : maxLength, name : name} ).save();
};

async function getAll() {
    await init();
    return await Level.find( {} );
};

async function find(name) {
    await init();
    return await Level.findOne({ name : name });
}

module.exports = { create, getAll, init, find };