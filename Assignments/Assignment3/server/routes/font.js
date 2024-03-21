var Font = require('./fontModel');

async function create( category, family, rule, url ) {
    return (await Font.create( {category : category, family : family, rule : rule, url : url} )).save();
};

async function getAll() {
    return await Font.getAll();
};

module.exports = { create, getAll };