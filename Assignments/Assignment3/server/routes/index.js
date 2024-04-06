var fs = require('fs');
var express = require('express');
var router = express.Router();
var Game = require('./gameModel');
var Font = require('./fontModel');
var Level = require('./levelModel');
var Metadata = require('./myMetadataModel');
var Colors = require('./colorsModel');
var User = require('./userModel');
var bcrypt = require('bcrypt');

/**
   * The class to represent an Error object.
   */
class Error {
  /**
   * Creates an Error object.
   * @param {string} msg The error message.
   */
  constructor(msg) {
    this.msg = msg;
  }
}

/**
 * Choose a word from the word list, based on minimum and maximum length requirements.
 * @param {number} min The minimum word length
 * @param {number} max The maximum word length
 * @returns A string representation of the secret word.
 */
async function getWordFromList(min, max) {
  return new Promise((resolve, reject) => {
    // Open the file.
    fs.readFile('./public/wordlist.txt', 'utf8', (err, data) => {
    if (err) {
      reject(err)
    }
    else {
      // Filter all the words based on length.
      let allWords = data.split(/\s+/);
      let result = allWords.filter((word) => {
        return min <= word.length && word.length <= max
      });

      // Choose a random word and resolve the Promise.
      let index = Math.floor(Math.random() * result.length);
      let randomWord = result[index];
      resolve(randomWord);
    }
  });
});
}

/* Verifies a session user matches their request data */
router.all('*/users/:uid*', function(req, res, next) {
  var user = req.session.user;
  if (user._id == req.params.uid) {
    next();
  }
  else {
    req.session.regenerate( function(err) { // create a new session id
      req.session.user = null;
    });
  }
});

router.post( '/logout', function( req, res, next ) {
  req.session.destroy(() => {
    res.json( 'ok' )
  });
});

router.post( '/login', ( req, res, next ) => {
 req.session.regenerate( async function( err ) { 
     let user = await User.findOne( { email: req.body.email } );
     if( user && await bcrypt.compare(req.body.password, user.password)) {
          req.session.user = user;
          user.password = "[REDACTED]";
          res.json( user );
       } else {
          res.status( 200 ).json( 'Error with email/password' );
       }
    } );
} );

router.put('/users/:uid/defaults', async (req, res, next) => {
  let userId = req.params.uid;
  let newDefaults = req.body;
  console.log('setting defaults');
  console.log(JSON.stringify(newDefaults));
  // req.session.regenerate( async function( err ) { 
    let mData = await User.findOneAndUpdate( { _id: userId }, { defaults: newDefaults });
    res.status(200).json(newDefaults);
  // });
})

router.get('/users/:uid/defaults', async (req, res, next) => {
  let userId = req.params.uid;
  let user = await User.findOne( { _id: userId });
  res.status(200).json( user.defaults );
});

/* GET a metadate obj describing all user-configurable settings. */
router.get('/meta', async (req, res, next) => {
  let mData = await Metadata.findOne({});
  res.status(200).json(mData);
});

/* GET a list of supported fonts. */
router.get('/fonts', async (req, res, next) => {
  let fonts = await Font.find({});
  res.status(200).json(fonts);
});

/* GET a list of games. */
router.get('/users/:uid/games', async (req, res, next) => {
  const uid = req.params.uid;
  let games = await Game.find( { userId: uid } );
  games.target = "[REDACTED]";
  res.status(200).json(games);
});

/* GET the game associated with the gid. */
router.get('/users/:uid/games/:gid', async (req, res, next) => {
  const uid = req.params.uid;
  const gid = req.params.gid;
  const games = await Game.findOne( { userId: uid, _id: gid } );
  games.target = "[REDACTED]";

  if (games.length !== 0) {
    res.status(200).json( games );
  }
  else {
    const error = new Error(`The game '${gid}' is not associated with the user '${uid}'.`)
    res.status(200).json( error );
  }
});

/* POST a new game object. */
router.post('/users/:uid/games', async (req, res, next) => {
  // Get parameters from the request.
  const uid = req.params.uid;
  const font = await Font.findOne( { rule: req.headers['x-font'] } );
  const level = await Level.findOne( { name: req.query.level } );
  const color = await Colors.create( { 
    guess: req.body.guess, 
    fore: req.body.fore, 
    word: req.body.word 
  });
  
  // Get the target word.
  let targetWord = await getWordFromList(level.minLength, level.maxLength);
  targetWord = targetWord.toUpperCase();

  let newGame = await Game.create( {userId: uid, colors: color, font: font, guesses: "", level: level, remaining: level.rounds,
    status: "unfinished", target: targetWord, timestamp: Date.now(), timeToComplete: "", view: "".padStart(targetWord.length, "_")} );
  newGame.target = "[REDACTED]";
  res.status(200).json( newGame );
});

/* POST a new guess object. */
router.post('/users/:uid/games/:gid/guesses', async (req, res, next) => {
  const uid = req.params.uid;
  const gid = req.params.gid;
  const guess = req.query['guess'].toUpperCase();

  if (guess.length != 1) {
    res.status(200).json( new Error("Only one letter can be guessed at a time.") );
    return;
  }
  let result = await addGuess(uid, gid, guess);

  if (typeof result === 'string' || result instanceof String) {
    res.status(200).json( new Error(result) );
    return;
  }
  else {
    result = await Game.findById(gid);
    res.status(200).json( result );
    return;
  }
});

async function addGuess(userId, gameId, guess) {
  let game = await Game.findById(gameId);
  if (game.userId !== userId) {
    return `The game '${gameId}' is not associated with the user '${userId}'.`;
  }
  else if (game.guesses.includes(guess)) {
    /* Already guessed, do nothing... */
    return `'${guess}' was guessed already.`;
  }

  let isRight = game.target.includes(guess);
  let newGuess = game.guesses.concat(guess);
  if (isRight) {
    let newView = "";
    for (let i = 0; i < game.target.length; i++) {
      if (game.view[i] !== '_') {
        newView = newView.concat(game.view[i]);
      }
      else if (guess === game.target[i]) {
        newView = newView.concat(guess);
      }
      else {
        newView = newView.concat('_');
      }
    }

    // Determine the state of the game and return.
    let newStatus;
    if (game.target == newView) {
      newStatus = 'victory';
      let completionTime = Date.now() - game.timestamp;
      return await Game.updateOne( {_id : gameId}, {guesses: newGuess, view: newView, status: newStatus, timeToComplete: completionTime} );
    }
    else if (game.remaining == 0) {
      newStatus = 'loss';
      let completionTime = Date.now() - game.timestamp;
      return await Game.updateOne( {_id : gameId}, {guesses: newGuess, view: newView, status: newStatus, timeToComplete: completionTime} );
    }
    return await Game.updateOne( {_id : gameId}, {guesses: newGuess, view: newView, status: newStatus} );
  }
  else {
    let newRemaining = game.remaining - 1;
    let newStatus = 'unfinished';
    if (newRemaining == 0) {
      newStatus = 'loss';
    }
    return await Game.updateOne( {_id : gameId}, {guesses: newGuess, remaining: newRemaining, status: newStatus} );
  }
}

module.exports = router;