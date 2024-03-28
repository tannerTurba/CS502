// var Game = require('./gameModel');
// var Colors = require('./colors');
// var Font = require('./font');
// var Level = require('./level');

// async function create(userId, colors, font, level, target) {
//     let dbColor = await Colors.find(colors.guess, colors.fore, colors.word);
//     let dbFont = await Font.find(font);
//     let dbLevel = await Level.find(level);

//     return await new Game( {userId: userId, colors: dbColor, font: dbFont, guesses: "", level: dbLevel, 
//         status: "unfinished", target: target, timestamp: Date.now(), timeToComplete: "", view: "".padStart(target.length, "_")} ).save();
// };

// async function getAll(userId) {
//     return await Game.find( {userId : userId} );
// }

// async function getGame(userId, gameId) {
//     return await Game.find( {userId: userId, _id: gameId} );
// }

// async function addGuess(userId, gameId, guess) {
//     let game = await Game.findById(gameId);
//     if (game.userId !== userId) {
//         return `The game '${gameId}' is not associated with the user '${userId}'.`;
//     }
//     else if (game.guesses.includes(guess)) {
//         /* Already guessed, do nothing... */
//         return `'${guess}' was guessed already.`;
//     }

//     let isRight = game.target.includes(guess);
//     let newGuess = game.guesses.concat(guess);
//     if (isRight) {
//         let newView = "";
//         for (let i = 0; i < game.target.length; i++) {
//             if (game.view[i] !== '_') {
//                 newView = newView.concat(game.view[i]);
//             }
//             else {
//                 if (guess === game.target[i]) {
//                 newView = newView.concat(guess);
//                 }
//                 else {
//                 newView = newView.concat('_');
//                 }
//             }
//         }

//         // Determine the state of the game and return.
//         let newStatus;
//         if (!game.view.includes('_')) {
//             newStatus = 'victory';
//             let completionTime = Date.now() - game.timestamp;
//             return await Game.updateOne( {_id : gameId}, {guesses: newGuess, view: newView, status: newStatus, timeToComplete: completionTime} );
//         }
//         else if (game.remaining == 0) {
//             newStatus = 'loss';
//             let completionTime = Date.now() - game.timestamp;
//             return await Game.updateOne( {_id : gameId}, {guesses: newGuess, view: newView, status: newStatus, timeToComplete: completionTime} );
//         }
//         return await Game.updateOne( {_id : gameId}, {guesses: newGuess, view: newView, status: newStatus} );
//     }
//     else {
//         let newRemaining = game.remaining--;
//         let newStatus = 'unfinished';
//         if (game.remaining == 0) {
//             newStatus = 'loss';
//         }
//         return await Game.updateOne( {_id : gameId}, {guesses: newGuess, remaining: newRemaining, status: newStatus} );
//     }
// }

// module.exports = { create, getAll, getGame, addGuess };