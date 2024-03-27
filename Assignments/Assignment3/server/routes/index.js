var fs = require('fs');
var express = require('express');
var router = express.Router();
var Game = require('./game');
var Font = require('./font');
var Level = require('./level');
var Metadata = require('./myMetadata');
var Users = require('./users');
var mongoose = require('mongoose');

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

async function init() {
  // remove all db documents
  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();
  collections
      .map((collection) => collection.name)
      .forEach(async (collectionName) => {
      db.dropCollection(collectionName);
  });

  await Level.init();
  await Font.init();
  await Metadata.init();
  await Users.init();
}

router.all('*', function(req, res, next) {
  console.log(req.method, req.path);
  next();
});

router.all('/users/:uid', function(req, res, next) {
  var user = req.session.user;
  if (user._id == uid) {
    next();
  }
  res.status( 403 ).send( 'Forbidden' );
});

/* GET a metadate obj describing all user-configurable settings. */
router.get('/meta', async (req, res, next) => {
  req.session.regenerate( async function( err ) { 
    let mData = await Metadata.getAll();
    res.status(200).json(mData);
  });
});

/* GET a list of supported fonts. */
router.get('/fonts', async (req, res, next) => {
  req.session.regenerate( async function( err ) { 
    let fonts = await Font.getAll();
    res.status(200).json(fonts);
  });
});

/* GET a list of games. */
router.get('/users/:uid/games', async (req, res, next) => {
  req.session.regenerate( async function( err ) { 
    const uid = req.params.uid;
    const games = await Game.getAll(uid);

    if (games.length !== 0) {
      res.status(200).json( games );
    }
    else {
      res.status(200).json(new Error(`No games associated with '${uid}'`));
    }
  });
});

  /* GET the game associated with the gid. */
router.get('/users/:uid/games/:gid', async (req, res, next) => {
  req.session.regenerate( async function( err ) { 
    const uid = req.params.uid;
    const gid = req.params.gid;
    const games = await Game.getGame(uid, gid);

    if (games.length !== 0) {
      res.status(200).json( games );
    }
    else {
      const error = new Error(`The game '${gid}' is not associated with the user '${uid}'.`)
      res.status(200).json( error );
    }
    const error = new Error(`The user '${uid}' does not exist.`)
    res.status(200).json( error );
  });
});

/* POST a new game object. */
router.post('/users/:uid/games', async (req, res, next) => {
  req.session.regenerate( async function( err ) { 
    // Get parameters from the request.
    const uid = req.params.uid;
    const font = req.headers['x-font'];
    const level = req.query.level;
    const color = { 
      "guess" : req.body.guess, 
      "fore" : req.body.fore, 
      "word" : req.body.word 
    };
    
    // Get the target word.
    let targetWord = await getWordFromList(level.minLength, level.maxLength);
    targetWord = targetWord.toUpperCase();
    let newGame = await Game.create(uid, color, font, level, targetWord, );
    res.status(200).json( newGame );
  });
});

/* POST a new guess object. */
router.post('/users/:uid/games/:gid/guesses', async (req, res, next) => {
  req.session.regenerate( async function( err ) { 
    const uid = req.params.uid;
    const gid = req.params.gid;
    const guess = req.query['guess'].toUpperCase();

    if (guess.length != 1) {
      res.status(200).json( new Error("Only one letter can be guessed at a time.") );
    }
    let result = await Game.addGuess(uid, gid, guess);

    if (typeof result === 'string' || result instanceof String) {
      res.status(200).json( new Error(result) );
    }
    else {
      res.status(200).json( result );
    }
  });
});

module.exports = router;