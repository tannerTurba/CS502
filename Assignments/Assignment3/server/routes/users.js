var User = require('./userModel');
var Defaults = require('./defaultsModel');

async function init( ) {
   const userDb = [["bilbo", "baggins"], ["frodo", "baggins"], ["samwise", "gamgee"], ["gandalf", "gray"]].map( names => {
           return new User( {
                   name : { first : names[0], last : names[1] },
                   password : "123",
                   email : names[0] + "@mordor.org",
                   enabled : true
               } );
            });

    return await User.insertMany( userDb );
};

/*
 * userDb is an object having
 * user.email as keys
 * and user objects as values
 */
async function save( user ) {
   return await new User(user).save();
}

async function findAll( ) {
    return await User.find( {} );
}


async function findById( id ) {
    return await User.findOne( { '_id' : id });
}


async function findByEmail( email ) {
    return await User.findOne( { 'email' : email } );
}


module.exports = { findByEmail, findById, findAll, save, init };
