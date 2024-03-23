var Font = require('./fontModel');

let FONTS = [
    { category: "sans-serif", family: "Protest Riot", rule: "protest-riot-regular", url: "https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap" },
    { category: "sans-serif", family: "Roboto", rule: "roboto-regular", url: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" },
    { category: "serif", family: "Noto Serif", rule: "noto-serif-regular", url: "https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap" }
];

async function init() {
    let fontCount = await Font.countDocuments();
    if (fontCount === 0) {
        FONTS.forEach(font => {
            create(font.category, font.family, font.rule, font.url);
        });
    }
}

async function create( category, family, rule, url ) {
    return (await Font.create( {category : category, family : family, rule : rule, url : url} )).save();
};

async function getAll() {
    await init();
    return await Font.find( {} );
};

async function find(rule) {
    await init()
    return await Font.findOne({ rule: rule });
}

module.exports = { create, getAll, init, find };