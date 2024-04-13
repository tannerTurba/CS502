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
        label: "Skippy Peanut Butter",
        knownAs: "Skippy Peanut Butter",
        nutrients: {
          ENERC_KCAL: 593.75,
          PROCNT: 21.875,
          FAT: 50,
          CHOCDF: 21.875,
          FIBTG: 6.25
        },
        brand: "Skippy",
        category: "Packaged foods",
        categoryLabel: "food",
        foodContentsLabel: "ROASTED PEANUTS; SUGAR; HYDROGENATED VEGETABLE OILS (COTTON SEED; SOYBEAN AND RAPESEED) TO PREVENT SEPARATING; SALT.",
        image: "https://www.edamam.com/food-img/404/404b3a57a1a51cedc7479204cf59a50a.png",
        servingSizes: [
          {
            uri: "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
            label: "Gram",
            quantity: 32
          },
          {
            uri: "http://www.edamam.com/ontologies/edamam.owl#Measure_tablespoon",
            label: "Tablespoon",
            quantity: 2
          }
        ],
        servingsPerContainer: 70
    }
];

async function initUsers(foods) {
    for (let i = 0; i < USERS.length; i++) {
        let user = USERS[i];
        await User.create({
            username: user.username,
            password: await bcrypt.hash(user.password, 10),
            firstName: user.firstName,
            lastName: user.lastName,
            food: foods
        });
    }
}

async function initFood() {
    let foods = [];
    for (let i = 0; i < FOOD.length; i++) {
        let food = FOOD[i];
        let nutrients = await Nutrients.create({
            calories : food.nutrients.ENERC_KCAL, 
            protein : food.nutrients.PROCNT,
            fat : food.nutrients.FAT,
            carbohydrates : food.nutrients.CHOCDF, 
            fiber : food.nutrients.FIBTG
        });
        let servingSizes = [];
        for (let k = 0; k < food.servingSizes.length; k++) {
            let servingSize = food.servingSizes[k];
            servingSizes.push(await ServingSize.create( servingSize ));
        }

        let f = await Food.create({
            label: food.label,
            knownAs: food.knownAs,
            nutrients: nutrients,
            brand: food.brand,
            category: food.category, 
            categoryLabel: food.categoryLabel,
            foodContentsLabel: food.foodContentsLabel,
            image: food.image,
            servingSizes: servingSizes,
            servingsPerContainer: food.servingsPerContainer
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
    
    let foods = await initFood();
    await initUsers(foods);
}

module.exports = { init };