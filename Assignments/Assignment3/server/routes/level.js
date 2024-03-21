var Level = require('./levelModel');

async function create(rounds, minLength, maxLength, name) {
    return await new Level( {rounds : rounds, minLength : minLength, maxLength : maxLength, name : name} ).save();
};

async function getAll() {
    return await Level.getAll();
};

module.exports = { create, getAll };