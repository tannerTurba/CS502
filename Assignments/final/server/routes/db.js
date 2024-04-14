var User = require('./userModel.js');
var Food = require('./foodModel.js');
var ServingSize = require('./servingSizeModel.js');
var Nutrients = require('./nutrientsModel.js');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

let USERS = [
    { username: "jDoe", password: "1", firstName: "John", lastName: "Doe" },
    { username: "jaDoe", password: "1", firstName: "Jane", lastName: "Doe" }
];

let FOOD = [
    {
        foodId: "food_a60ilboavp161pbygvy9ebn1snp8",
        label: "Skippy Peanut Butter Creamy, 18.0 Oz",
        knownAs: "Skippy Peanut Butter Creamy, 18.0 oz",
        nutrients: {
            ENERC_KCAL: 558.5043975350233,
            PROCNT: 20.576477803921907,
            FAT: 47.03194926610722,
            CHOCDF: 20.576477803921907,
            FIBTG: 5.878993658263402
        },
        brand: "Skippy",
        category: "Packaged foods",
        categoryLabel: "food",
        foodContentsLabel: "Roasted Peanuts; Sugar; Partially Hydrogenated Vegetable Oils; Cottonseed; Soybean And Rapeseed; To Prevent Separation; Salt",
        image: "https://www.edamam.com/food-img/f3d/f3d9d7ed1c98c955e019ecaab47f1e60.jpg",
        servingSizes: [
            {
            uri: "http://www.edamam.com/ontologies/edamam.owl#Measure_tablespoon",
            label: "Tablespoon",
            quantity: 2
            },
            {
            uri: "http://www.edamam.com/ontologies/edamam.owl#Measure_ounce",
            label: "Ounce",
            quantity: 1.2
            }
        ],
        servingsPerContainer: 15,
        quantity: 2
    },
    {
        foodId: "food_b1z309nagt045vai2cy6jbx0zu11",
        label: "Cheez-It",
        knownAs: "cheez-it",
        nutrients: {
            ENERC_KCAL: 507.0,
            PROCNT: 11.4,
            FAT: 26.3,
            CHOCDF: 57.4,
            FIBTG: 2.4
        },
        brand: '',
        category: "Generic foods",
        categoryLabel: "food",
        foodContentsLabel: '',
        image: '', 
        servingSizes: [],
        servingsPerContainer: -1,
        quantity: 3
    }
];

async function initUsers() {
    for (let i = 0; i < USERS.length; i++) {
        let user = USERS[i];
        let u = await User.create({
            username: user.username,
            password: await bcrypt.hash(user.password, 10),
            firstName: user.firstName,
            lastName: user.lastName
        });
        await initFood(u._id);
    }
}

async function initFood(userId) {
    let foods = [];
    for (let i = 0; i < FOOD.length; i++) {
        let food = FOOD[i];
        let nutrients = await Nutrients.create( food.nutrients );
        let servingSizes = [];
        for (let k = 0; k < food.servingSizes.length; k++) {
            let servingSize = food.servingSizes[k];
            servingSizes.push(await ServingSize.create( servingSize ));
        }

        let f = await Food.create({
            userId: userId,
            label: food.label,
            knownAs: food.knownAs,
            nutrients: nutrients,
            brand: food.brand,
            category: food.category, 
            categoryLabel: food.categoryLabel,
            foodContentsLabel: food.foodContentsLabel,
            image: food.image,
            servingSizes: servingSizes,
            servingsPerContainer: food.servingsPerContainer,
            quantity: food.quantity
        });
        foods.push(f);
    }
    return foods;
}

async function init() {
    // remove all db documents
    const data = mongoose.connection.db;
    const collections = await data.listCollections().toArray();
    let names = collections.map((collection) => collection.name);
    for (let i = 0; i < names.length; i++) {
        await data.dropCollection(names[i]);
    }
    
    let users = await initUsers();
}

module.exports = { init };