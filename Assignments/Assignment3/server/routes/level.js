var Level = require('./levelModel');

let LEVELS = [
    { rounds: 8, minLength: 3, maxLength: 5, name: "Easy"},
    { rounds: 7, minLength: 4, maxLength: 10, name: "Medium"},
    { rounds: 6, minLength: 9, maxLength: 300, name: "Hard"},
];

async function init() {
    LEVELS.forEach(level => {
        create(level.rounds, level.minLength, level.maxLength, level.name);
    });
}

async function create(rounds, minLength, maxLength, name) {
    return (new Level( {rounds : rounds, minLength : minLength, maxLength : maxLength, name : name} )).save();
};

async function getAll() {
    return await Level.find( {} );
};

async function find(name) {
    return await Level.findOne({ name : name });
}

module.exports = { create, getAll, init, find };