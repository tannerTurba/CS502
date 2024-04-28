var User = require('./userModel.js');
var Food = require('./foodModel.js');
var ServingSize = require('./servingSizeModel.js');
var Nutrients = require('./nutrientsModel.js');
var Directory = require('./directoryModel.js');
var Message = require('./messageModel.js');
var Household = require('./householdModel.js');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var { faker } = require('@faker-js/faker');

// let USERS = [
//     { username: "jDoe", password: "1", firstName: "John", lastName: "Doe", role: 'admin', status: 'JOINED', householdId: '' },
//     { username: "jaDoe", password: "1", firstName: "Jane", lastName: "Doe", role: 'member', status: 'JOINED', householdId: '' },
//     { username: "test", password: "1", firstName: "test", lastName: "test", role: '', status: '', householdId: '' }
// ];

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
    },
    {
        "foodId": "food_awe80f5alx59k4an6ebyeb9a8m2h",
        "label": "Cookies",
        "knownAs": "cookies",
        "nutrients": {
          "ENERC_KCAL": 423,
          "PROCNT": 5.25,
          "FAT": 22.08,
          "CHOCDF": 65.86
        },
        "category": "Generic foods",
        "categoryLabel": "food",
        "image": "https://www.edamam.com/food-img/c49/c49cbd80f3156ae1b2a7d0a5f23a4a00.jpg",
        "servingSizes": [],
        "quantity": 2,
        "__v": 0
      },
      {
        "foodId": "food_bn6aoj9atkqx8fbkli859bbbxx62",
        "label": "Honey",
        "knownAs": "Honey",
        "nutrients": {
          "ENERC_KCAL": 304,
          "PROCNT": 0.3,
          "FAT": 0,
          "CHOCDF": 82.4,
          "FIBTG": 0.2
        },
        "category": "Generic foods",
        "categoryLabel": "food",
        "image": "https://www.edamam.com/food-img/198/198c7b25c23b4235b4cc33818c7b335f.jpg",
        "servingSizes": [],
        "quantity": 2,
        "__v": 0
      },
      {
        "foodId": "food_by8rc5abgwzxf2apg0hewbkfhyjw",
        "label": "Cheetos",
        "knownAs": "cheese puff",
        "nutrients": {
          "ENERC_KCAL": 432,
          "PROCNT": 8.5,
          "FAT": 12.1,
          "CHOCDF": 72.4,
          "FIBTG": 3.6
        },
        "category": "Generic foods",
        "categoryLabel": "food",
        "image": "https://www.edamam.com/food-img/464/464351a6d2739cef8e568381a499a2aa.jpg",
        "servingSizes": [],
        "quantity": 3,
        "__v": 0
      },
      {
        "foodId": "food_amhlqj0by3ozesbg96kkhar1atxt",
        "label": "Fuji Apple",
        "knownAs": "fuji apple",
        "nutrients": {
          "ENERC_KCAL": 63,
          "PROCNT": 0.2,
          "FAT": 0.18,
          "CHOCDF": 15.2,
          "FIBTG": 2.1
        },
        "category": "Generic foods",
        "categoryLabel": "food",
        "image": "https://www.edamam.com/food-img/327/327e8b398000b83e4764ca0bab240f14.jpg",
        "servingSizes": [],
        "quantity": 2,
        "__v": 0
      },
      {
        "foodId": "food_b20nj78ajzve2qbjgnu8qbsazgdb",
        "label": "Sausage Pizza",
        "knownAs": "sausage pizza",
        "nutrients": {
          "ENERC_KCAL": 280,
          "PROCNT": 11.5,
          "FAT": 12.4,
          "CHOCDF": 30.6,
          "FIBTG": 2.3
        },
        "category": "Generic foods",
        "categoryLabel": "food",
        "image": "https://www.edamam.com/food-img/7e4/7e4559e8b0dea671e0d0e7cd2fecbef5.jpg",
        "servingSizes": [],
        "quantity": 2,
        "__v": 0
      },
      {
        "foodId": "food_abp2hivbz4bvnxbu8himgb0rgmvo",
        "label": "Fresh Pasta",
        "knownAs": "fresh pasta",
        "nutrients": {
          "ENERC_KCAL": 288,
          "PROCNT": 11.3,
          "FAT": 2.3,
          "CHOCDF": 54.7
        },
        "category": "Generic foods",
        "categoryLabel": "food",
        "image": "https://www.edamam.com/food-img/882/8825533f89f0fde6397f43b22ef20cfe.jpg",
        "servingSizes": [],
        "quantity": 1,
        "__v": 0
      },
      {
        "foodId": "food_bbhw5lya0kgo8nact7pisb7koimn",
        "label": "Pecan Ice Cream",
        "knownAs": "butter pecan ice cream",
        "nutrients": {
          "ENERC_KCAL": 180,
          "PROCNT": 3.99,
          "FAT": 10.3,
          "CHOCDF": 21.3,
          "FIBTG": 0.9
        },
        "category": "Generic foods",
        "categoryLabel": "food",
        "image": "https://www.edamam.com/food-img/948/94852938b2630bce1f28b01d05f929a0.jpg",
        "servingSizes": [],
        "quantity": 1,
        "__v": 0
      },
      {
        "foodId": "food_a4l1k0aa2jlekoajhigocbkixuyz",
        "label": "Cinnamon Chex Cereal Rice Sweetened With Real Cinnamon Gluten Free - 12 Oz",
        "knownAs": "Cinnamon Chex Cereal Rice Sweetened With Real Cinnamon Gluten Free - 12 Oz",
        "nutrients": {
          "ENERC_KCAL": 71.85479824141638,
          "PROCNT": 0.845350567546075,
          "FAT": 1.69070113509215,
          "CHOCDF": 13.948284364510236,
          "FIBTG": 0.845350567546075
        },
        "brand": "Chex",
        "category": "Packaged foods",
        "categoryLabel": "food",
        "foodContentsLabel": "Whole Grain Rice;  Rice;  Sugar;  Canola and/or Sunflower Oil;  Salt;  Rice Fiber;  Cinnamon;  Molasses;  Natural Flavor;  Vitamin E (Mixed Tocopherols) Added to Preserve Freshness;  Vitamins and Minerals: Calcium Carbonate;  Iron and Zinc (Mineral Nutrients);  Vitamin C (Sodium Ascorbate);  A B Vitamin (Niacinamide);  Vitamin B2;  (Riboflavin);  Vitamin B6 (Pyridoxine Hydrochloride);  Vitamin B1 (Thiamin Mononitrate);  Vitamin A (Palmitate);  A B Vitamin (Folic Acid);  Vitamin B12;  Vitamin D3.",
        "image": "https://www.edamam.com/food-img/564/56498f0d91130a34ff79725dc5bbcf84",
        "servingSizes": [
          {
            "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_cup",
            "label": "Cup",
            "quantity": 1
          }
        ],
        "quantity": 2,
        "__v": 0
      },
      {
        "foodId": "food_a7vu13pbog16eoblu230lb6nm3wu",
        "label": "Beef Hot Dog",
        "knownAs": "beef frankfurter",
        "nutrients": {
          "ENERC_KCAL": 290,
          "PROCNT": 10.3,
          "FAT": 25.8,
          "CHOCDF": 4.17,
          "FIBTG": 0
        },
        "category": "Generic foods",
        "categoryLabel": "food",
        "image": "https://www.edamam.com/food-img/533/533c1ce3b907a8a70abd8be2a5339734.jpg",
        "servingSizes": [],
        "quantity": 2,
        "__v": 0
      },
      {
        "foodId": "food_aregbrwb5q7z2db1h14uxaizfd9f",
        "label": "Beef Steak",
        "knownAs": "steak",
        "nutrients": {
          "ENERC_KCAL": 228,
          "PROCNT": 20,
          "FAT": 15.8,
          "CHOCDF": 0,
          "FIBTG": 0
        },
        "category": "Generic foods",
        "categoryLabel": "food",
        "image": "https://www.edamam.com/food-img/4d2/4d2ae7e6fd2145d4c89a8ffae7d4f2b7.jpg",
        "servingSizes": [],
        "quantity": 2,
        "__v": 0
      },
      {
        "foodId": "food_bg0rlw7bt25ojiavi5k7dbv51765",
        "label": "Baby Carrot",
        "knownAs": "baby carrot",
        "nutrients": {
          "ENERC_KCAL": 35,
          "PROCNT": 0.64,
          "FAT": 0.13,
          "CHOCDF": 8.24,
          "FIBTG": 2.9
        },
        "category": "Generic foods",
        "categoryLabel": "food",
        "image": "https://www.edamam.com/food-img/954/9546f1fd29336cab2ecf552935d03206.jpg",
        "servingSizes": [],
        "quantity": 2,
        "__v": 0
      },
      {
        "foodId": "food_a6k79rrahp8fe2b26zussa3wtkqh",
        "label": "Tomato",
        "knownAs": "tomato",
        "nutrients": {
          "ENERC_KCAL": 18,
          "PROCNT": 0.88,
          "FAT": 0.2,
          "CHOCDF": 3.89,
          "FIBTG": 1.2
        },
        "category": "Generic foods",
        "categoryLabel": "food",
        "image": "https://www.edamam.com/food-img/23e/23e727a14f1035bdc2733bb0477efbd2.jpg",
        "servingSizes": [],
        "quantity": 2,
        "__v": 0
      },
      {
        "foodId": "food_a7e70joahmaymibybmv10buc9vxy",
        "label": "Ritz Cracker",
        "knownAs": "ritz cracker",
        "nutrients": {
            "ENERC_KCAL": 492,
            "PROCNT": 7.23,
            "FAT": 23.2,
            "CHOCDF": 63.5,
            "FIBTG": 2.3,
            "__v": 0
        },
        "category": "Generic foods",
        "categoryLabel": "food",
        "image": "https://www.edamam.com/food-img/752/7526e07c93cab399169fad9a7c04d7a1.png",
        "servingSizes": [],
        "quantity": 1,
        "__v": 0
    },
    {
        "foodId": "food_bgkl0cuasoeomtbolalmcauhha54",
        "label": "Fresh Blueberries",
        "knownAs": "blueberries",
        "nutrients": {
            "ENERC_KCAL": 57,
            "PROCNT": 0.74,
            "FAT": 0.33,
            "CHOCDF": 14.5,
            "FIBTG": 2.4,
            "__v": 0
        },
        "category": "Generic foods",
        "categoryLabel": "food",
        "image": "https://www.edamam.com/food-img/f55/f55705a2a9ea9f7abf449a05fa968139.png",
        "servingSizes": [],
        "quantity": 2,
        "__v": 0
    },
    {
        "foodId": "food_apzyux9a8nquguacgvcf4areicqj",
        "label": "Peanut Granola Bar",
        "knownAs": "peanut granola bar",
        "nutrients": {
            "ENERC_KCAL": 536,
            "PROCNT": 9.6,
            "FAT": 31.2,
            "CHOCDF": 54.1,
            "FIBTG": 3.8,
            "__v": 0
        },
        "category": "Generic foods",
        "categoryLabel": "food",
        "image": "https://www.edamam.com/food-img/12f/12ff54861c9f598aaedebed24fd2b052.jpg",
        "servingSizes": [],
        "quantity": 2,
        "__v": 0
    },
    {
        "foodId": "food_al3e7s2a1lm4i6bga7o0abp399zg",
        "label": "Raspberry",
        "knownAs": "raspberries",
        "nutrients": {
            "ENERC_KCAL": 52,
            "PROCNT": 1.2,
            "FAT": 0.65,
            "CHOCDF": 11.9,
            "FIBTG": 6.5,
            "__v": 0
        },
        "category": "Generic foods",
        "categoryLabel": "food",
        "image": "https://www.edamam.com/food-img/a67/a671e604bed03c27259eab176c781e22.jpg",
        "servingSizes": [],
        "quantity": 2,
        "__v": 0
    },
    {
        "foodId": "food_abiw5baauresjmb6xpap2bg3otzu",
        "label": "Yukon Gold Potatoes",
        "knownAs": "potato",
        "nutrients": {
            "ENERC_KCAL": 77,
            "PROCNT": 2.05,
            "FAT": 0.09,
            "CHOCDF": 17.5,
            "FIBTG": 2.1,
            "__v": 0
        },
        "category": "Generic foods",
        "categoryLabel": "food",
        "image": "https://www.edamam.com/food-img/651/6512e82417bce15c2899630c1a2799df.jpg",
        "servingSizes": [],
        "quantity": 3,
        "__v": 0
    },
    {
        "foodId": "food_bdzncwxbfc2olbadjnft8a8uxwwk",
        "label": "Cooked Deli Ham",
        "knownAs": "COOKED DELI HAM",
        "nutrients": {
            "ENERC_KCAL": 107,
            "PROCNT": 17.860000610351562,
            "FAT": 2.680000066757202,
            "CHOCDF": 1.7899999618530273,
            "FIBTG": 0,
            "__v": 0
        },
        "brand": "DELI",
        "category": "Packaged foods",
        "categoryLabel": "food",
        "foodContentsLabel": "SOLUTION INGREDIENTS: WATER; SALT; TURBINADO SUGAR; CULTURED CELERY POWDER; CHERRY POWDER.",
        "image": "https://www.edamam.com/food-img/64c/64c9c7960bc38ecaf2f0106bb5a5ced6.jpg",
        "servingSizes": [
            {
                "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
                "label": "Gram",
                "quantity": 56,
                "__v": 0
            },
            {
                "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_slice",
                "label": "Slice",
                "quantity": 4,
                "__v": 0
            }
        ],
        "quantity": 1,
        "__v": 0
    },
    {
        "foodId": "food_avtcmx6bgjv1jvay6s6stan8dnyp",
        "label": "Garlic",
        "knownAs": "garlic",
        "nutrients": {
            "ENERC_KCAL": 149,
            "PROCNT": 6.36,
            "FAT": 0.5,
            "CHOCDF": 33.1,
            "FIBTG": 2.1,
            "__v": 0
        },
        "category": "Generic foods",
        "categoryLabel": "food",
        "image": "https://www.edamam.com/food-img/6ee/6ee142951f48aaf94f4312409f8d133d.jpg",
        "servingSizes": [],
        "quantity": 3,
        "__v": 0
    },
    {
        "foodId": "food_bz8rcwobbzm7zhb3wh2n7aznivou",
        "label": "Green Bell Pepper",
        "knownAs": "green bell pepper",
        "nutrients": {
            "ENERC_KCAL": 20,
            "PROCNT": 0.86,
            "FAT": 0.17,
            "CHOCDF": 4.64,
            "FIBTG": 1.7,
            "__v": 0
        },
        "category": "Generic foods",
        "categoryLabel": "food",
        "image": "https://www.edamam.com/food-img/629/629dc9fddc1f8aec27fa337dd6ce2b7c.jpg",
        "servingSizes": [],
        "quantity": 1,
        "__v": 0
    },
    {
        "foodId": "food_av7gav4bs6txmfb85t0ruapws8if",
        "label": "Ground Turkey",
        "knownAs": "ground turkey",
        "nutrients": {
            "ENERC_KCAL": 148,
            "PROCNT": 19.7,
            "FAT": 7.66,
            "CHOCDF": 0,
            "FIBTG": 0,
            "__v": 0
        },
        "category": "Generic foods",
        "categoryLabel": "food",
        "image": "https://www.edamam.com/food-img/c1a/c1a1663042ef7f4d6d50f1f6418aaac6.jpg",
        "servingSizes": [],
        "quantity": 1,
        "__v": 0
    },
    {
        "foodId": "food_bdrxu94aj3x2djbpur8dhagfhkcn",
        "label": "Skinless Chicken Breasts",
        "knownAs": "chicken breast",
        "nutrients": {
            "ENERC_KCAL": 120,
            "PROCNT": 22.5,
            "FAT": 2.62,
            "CHOCDF": 0,
            "FIBTG": 0,
            "__v": 0
        },
        "category": "Generic foods",
        "categoryLabel": "food",
        "image": "https://www.edamam.com/food-img/da5/da510379d3650787338ca16fb69f4c94.jpg",
        "servingSizes": [],
        "quantity": 2,
        "__v": 0
    },
    {
        "foodId": "food_a5g9yevb1iactoaiimbvjbkrxueh",
        "label": "Soy Sauce",
        "knownAs": "soy sauce",
        "nutrients": {
            "ENERC_KCAL": 53,
            "PROCNT": 8.14,
            "FAT": 0.57,
            "CHOCDF": 4.93,
            "FIBTG": 0.8,
            "__v": 0
        },
        "category": "Generic foods",
        "categoryLabel": "food",
        "image": "https://www.edamam.com/food-img/f56/f562e461eb0618f367f538b836c17b82.jpg",
        "servingSizes": [],
        "quantity": 2,
        "__v": 0
    },
    {
        "foodId": "food_b4wvre6b14mmkpaa22d8ybup8q51",
        "label": "Sweet Corn",
        "knownAs": "corn",
        "nutrients": {
            "ENERC_KCAL": 86,
            "PROCNT": 3.27,
            "FAT": 1.35,
            "CHOCDF": 18.7,
            "FIBTG": 2,
            "__v": 0
        },
        "category": "Generic foods",
        "categoryLabel": "food",
        "image": "https://www.edamam.com/food-img/eb5/eb5e11afb9f697720b2de2e0e0e27d8d.jpg",
        "servingSizes": [],
        "quantity": 1,
        "__v": 0
    },
    {
        "foodId": "food_a76jqx4bnd9n8ca5tojgab31dyur",
        "label": "Vidalia Onion",
        "knownAs": "sweet onion",
        "nutrients": {
            "ENERC_KCAL": 32,
            "PROCNT": 0.8,
            "FAT": 0.08,
            "CHOCDF": 7.55,
            "FIBTG": 0.9,
            "__v": 0
        },
        "category": "Generic foods",
        "categoryLabel": "food",
        "image": "https://www.edamam.com/food-img/a7f/a7fd8e3b26066b4c96d5b5804e7f0976.jpg",
        "servingSizes": [],
        "quantity": 1,
        "__v": 0
    },
    {
        "foodId": "food_a3049hmbqj5wstaeeb3udaz6uaqv",
        "label": "Bread",
        "knownAs": "bread",
        "nutrients": {
            "ENERC_KCAL": 274,
            "PROCNT": 10.7,
            "FAT": 4.53,
            "CHOCDF": 47.5,
            "FIBTG": 4,
            "__v": 0
        },
        "category": "Generic foods",
        "categoryLabel": "food",
        "image": "https://www.edamam.com/food-img/886/886960f6ce6ccec5b9163bacf2996853.jpg",
        "servingSizes": [],
        "quantity": 1,
        "__v": 0
    },
    {
        "foodId": "food_a2uzu1hbj0yi8nb6a0rbkb5gvgz4",
        "label": "Colby Cheese",
        "knownAs": "colby cheese",
        "nutrients": {
            "ENERC_KCAL": 394,
            "PROCNT": 23.8,
            "FAT": 32.1,
            "CHOCDF": 2.57,
            "FIBTG": 0,
            "__v": 0
        },
        "category": "Generic foods",
        "categoryLabel": "food",
        "image": "https://www.edamam.com/food-img/a6a/a6a3cb346882b674c5b5086352644ec5.jpg",
        "servingSizes": [],
        "quantity": 2,
        "__v": 0
    },
    {
        "foodId": "food_a34cdj5b0kyuhfbov30xcb50u4dv",
        "label": "Mustard",
        "knownAs": "mustard",
        "nutrients": {
            "ENERC_KCAL": 60,
            "PROCNT": 3.74,
            "FAT": 3.34,
            "CHOCDF": 5.83,
            "FIBTG": 4,
            "__v": 0
        },
        "category": "Generic foods",
        "categoryLabel": "food",
        "image": "https://www.edamam.com/food-img/e23/e238f2e4cfa6aa1a30f46dc73e7344eb.jpg",
        "servingSizes": [],
        "quantity": 1,
        "__v": 0
    },
    {
        "foodId": "food_au7jthtab0n3era9uue8pauakroe",
        "label": "Tomato Ketchup",
        "knownAs": "ketchup",
        "nutrients": {
            "ENERC_KCAL": 101,
            "PROCNT": 1.04,
            "FAT": 0.1,
            "CHOCDF": 27.4,
            "FIBTG": 0.3,
            "__v": 0
        },
        "category": "Generic foods",
        "categoryLabel": "food",
        "image": "https://www.edamam.com/food-img/257/257207c446011b849001ae596390341c.jpeg",
        "servingSizes": [],
        "quantity": 2,
        "__v": 0
    }
];

async function initFood(food, userId) {
    let nutrients = await Nutrients.create( food.nutrients );
    let servingSizes = [];
    for (let k = 0; k < food.servingSizes.length; k++) {
        let servingSize = food.servingSizes[k];
        servingSizes.push(await ServingSize.create( servingSize ));
    }

    let f = await Food.create({
        userId: userId,
        foodId: food.foodId,
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
        quantity: Math.trunc((Math.random() * 10) + 1)
    });
    return f;
}

async function initUser(user, householdId, role, shouldPrint) {
    let u = await User.create({
        username: user.username,
        password: await bcrypt.hash(user.password, 10),
        firstName: user.firstName,
        lastName: user.lastName,
        role: role,
        status: 'JOINED',
        householdId: householdId
    });
    if (shouldPrint) {
        console.log(user);
    }
    return u;
}

async function initHousehold(shouldPrint) {
    let household = await Household.create( { members: [], foodIds: [] } );

    let foodIds = [];
    let users = [];
    for(let i = 0; i < 5; i++) {
        let role = 'member';
        if (i === 0) {
            role = 'admin';
        }
        let user = await initUser(fakeUser(), household._id, role, shouldPrint);
        users.push(user);

        for (let k = 0; k < FOOD.length; k++) {
            let food = await initFood(FOOD[k], user._id);
            if (!foodIds.includes(food.foodId)) {
                foodIds.push(food.foodId);
            }
        }
    }
    
    await Household.updateOne( {_id: household._id}, {members: users, foodIds: foodIds} );
    
    let owner;
    while (users.length > 1) {
        owner = users.pop();
        await initDirectory(owner, users);
    }
}

function fakeUser() {
    return { 
        username: faker.internet.userName(),
        password: faker.internet.password({length:6}), 
        firstName: faker.person.firstName(), 
        lastName: faker.person.lastName(), 
        role: '', 
        status: '', 
        householdId: '' 
    };
}

// async function initUsers() {
//     let users = [];
//     for (let i = 0; i < USERS.length; i++) {
//         let user = USERS[i];
//         let u = await User.create({
//             username: user.username,
//             password: await bcrypt.hash(user.password, 10),
//             firstName: user.firstName,
//             lastName: user.lastName,
//             role: user.role,
//             status: user.status
//         });
//         await initFood(u._id);
//         users.push(u);
//     }
//     return users;
// }

// async function initFood(userId) {
//     let foods = [];
//     for (let i = 0; i < FOOD.length; i++) {
//         let food = FOOD[i];
//         let nutrients = await Nutrients.create( food.nutrients );
//         let servingSizes = [];
//         for (let k = 0; k < food.servingSizes.length; k++) {
//             let servingSize = food.servingSizes[k];
//             servingSizes.push(await ServingSize.create( servingSize ));
//         }

//         let f = await Food.create({
//             userId: userId,
//             foodId: food.foodId,
//             label: food.label,
//             knownAs: food.knownAs,
//             nutrients: nutrients,
//             brand: food.brand,
//             category: food.category, 
//             categoryLabel: food.categoryLabel,
//             foodContentsLabel: food.foodContentsLabel,
//             image: food.image,
//             servingSizes: servingSizes,
//             servingsPerContainer: food.servingsPerContainer,
//             quantity: food.quantity
//         });
//         foods.push(f);
//     }
//     return foods;
// }

async function initMessages(to, from, foods) {
    let messages = []
    for (let i = 0; i < foods.length; i++) {
        let food = foods[i];

        let message = await Message.create({
            to: to,
            from: from,
            food: food,
            quantity: Math.trunc((Math.random() * 10) + 1),
            status: 'active',
            dateSent: Date.now()
        });
        messages.push(message);
    }
    return messages;
}

async function initDirectory(owner, contacts) {
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let contactFoods = await Food.find( { userId: contact._id } );
        let messages = await initMessages(owner._id, contact._id, contactFoods);
    }

    await Directory.create({
        ownerId: owner._id,
        contacts: contacts
    });
}

// async function initHousehold(members) {
//     let foodIds = [];
//     for (let i = 0; i < FOOD.length; i++) {
//         foodIds.push(FOOD[i].foodId);
//     }
    
//     let household = await Household.create( { members: [members[0], members[1]], foodIds: foodIds } );
    
//     for (let i = 0; i < 2; i++) {
//         let user = members[i];
//         await User.updateOne( { _id: user._id }, { householdId: household._id } );
//     }
// }

async function init() {
    // remove all db documents
    const data = mongoose.connection.db;
    const collections = await data.listCollections().toArray();
    let names = collections.map((collection) => collection.name);
    for (let i = 0; i < names.length; i++) {
        await data.dropCollection(names[i]);
    }
    
    // let users = await initUsers();
    // await Directory.create( {ownerId: users[2]._id, contacts: []} );
    // await initDirectory(users[0], [users[1]]);
    // await initDirectory(users[1], [users[0]]);
    // await initHousehold(users);

    let print = true;
    for (let i = 0; i < 1; i++) {
        await initHousehold(print);
        print = false;
    }
    console.log('ready');
}

module.exports = { init };