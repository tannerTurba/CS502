var User = require('./userModel');
var Defaults = require('./defaults');

async function init( ) {
    let userCount = await User.countDocuments();
    if (userCount === 0) {
        const color = { 
            "guess" : "#fefae0", 
            "fore" : "#283618", 
            "word" : "#9aac5d" 
        };  
        let defaults = Defaults.create('protest-riot-regular', 'Easy', color);
        const userDb = [["bilbo@mordor.org", "111111111"], ["frodo@mordor.org", "222222222"], ["samwise@mordor.org", "333333333"]].map( info => {
                return new User( {
                        email : info[0],
                        password : info[1],
                        defaults : defaults._id
                    } );
                });
    
        return await User.insertMany( userDb );
    }
};

async function findAll( ) {
    await init();
    return await User.find( {} );
}

async function findById( id ) {
    await init();
    return await User.findOne( { '_id' : id });
}

async function findByEmail( email ) {
    await init();
    return await User.findOne( { 'email' : email } );
}

module.exports = { findByEmail, findById, findAll, init };
