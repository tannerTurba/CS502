var fs = require('fs');
var express = require('express');
var router = express.Router();

/**
 * The class to represent a Font object.
 */
class Font {
    /**
     * Creates a Font object.
     * @param {string} category The category the font belongs to.
     * @param {string} family the family the font belongs to.
     * @param {string} rule the rule to use.
     * @param {string} url the font's style url.
     */
    constructor(category, family, rule, url) {
      this.category = category;
      this.family = family;
      this.rule = rule;
      this.url = url;
    }
  }
  /**
   * Predefined Font objects, which represent the supported fonts.
   */
  Font.FONTS = {
    PROTEST_RIOT: new Font("sans-serif", "Protest Riot", "protest-riot-regular", "https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap"),
    ROBOTO: new Font("sans-serif", "Roboto", "roboto-regular", "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"),
    NOTO_SERIF: new Font("serif", "Noto Serif", "noto-serif-regular", "https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap")
  };
  
  /**
   * The class to represent a Level object.
   */
  class Level {
    /**
     * Creates a Level object.
     * @param {number} rounds The number of rounds to play.
     * @param {number} minLength The minimum length of the word.
     * @param {number} maxLength The maximum length of the word.
     * @param {string} name The name identifier of a level.
     */
    constructor(rounds, minLength, maxLength, name) {
      this.rounds = rounds;
      this.minLength = minLength;
      this.maxLength = maxLength;
      this.name = name;
    }
  }
  /**
   * Predefined Level objects, which represent the supported levels.
   */
  Level.LEVELS = {
    EASY: new Level(8, 3, 5, "Easy"),
    MEDIUM: new Level(7, 4, 10, "Medium"),
    HARD: new Level(6, 9, 300, "Hard")
  };
  
  /**
   * The class to represent a Color object.
   */
  class Colors {
    /**
     * Creates a Color object.
     * @param {string} guessColor the color of the guess background.
     * @param {string} foreColor the color of the text background.
     * @param {string} wordColor the color of the text.
     */
    constructor(guessColor, foreColor, wordColor) {
      this.guessColor = guessColor;
      this.foreColor = foreColor;
      this.wordColor = wordColor;
    }
  }
  /**
   * A predefined Color object that defines the default color values.
   */
  Colors.DEFAULT = new Colors("#fefae0", "#283618", "#9aac5d");
  
  /**
   * The class to represent a Metadata object.
   */
  class Metadata {
    /**
     * Creates a Metadata object.
     * @param {List<Font>} fonts The fonts supported by the router.
     * @param {List<Level>} levels The levels supported by the router.
     * @param {Defaults} defaults The default settings of the router.
     */
    constructor(fonts, levels, defaults) {
      this.fonts = fonts;
      this.levels = levels;
      this.defaults = defaults;
    }
  }
  
  /**
   * The class to represent a Defaults object.
   */
  class Defaults {
    /**
     * 
     * @param {Font} font The default Font configuration.
     * @param {Level} level The default Level configuration.
     * @param {Colors} colors The default Colors configuration.
     */
    constructor(font, level, colors) {
      this.font = font;
      this.level = level;
      this.colors = colors;
    }
  }
  
  /**
   * The class to represent a Game object.
   */
  class Game {
    /**
     * Creates a Game object.
     * @param {Colors} colors The Colors configuration.
     * @param {Font} font The Font configuration.
     * @param {string} id A unique identifier for the game.
     * @param {Level} level The Level configuration.
     */
    constructor(colors, font, id, level, target) {
      this.colors = colors;
      this.font = font;
      this.guesses = "";
      this.id = id;
      this.level = level;
      this.remaining = this.level.rounds;
      this.status = Game.STATUSES.UNFINISHED;
      this.target = target;
      this.timestamp = Date.now();
      this.timeToComplete = "";
      this.view = "".padStart(target.length, '_');
    }
    /**
     * Adds a guess to the list of guessed letters.
     */
    addGuess(guess) {
      if (this.guesses === undefined) {
        this.guesses = guess;
      }
      else {
        this.guesses = this.guesses.concat(guess);
      }
    }
    
    /**
     * The possible statuses that the game can be. 
     */
    static STATUSES = {
      UNFINISHED: 'unfinished',
      LOSS: 'loss',
      VICTORY: 'victory'
    };
  }
  
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
  
const sessions = new Map();
const fonts = [Font.FONTS.PROTEST_RIOT, Font.FONTS.ROBOTO, Font.FONTS.NOTO_SERIF];
const levels = [Level.LEVELS.EASY, Level.LEVELS.MEDIUM, Level.LEVELS.HARD];

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

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
});

/* GET SID. */
router.get('/api/v1/sid', (req, res) => {
  if (req.sessionID) {
    res.status(200).json({ sid: req.sessionID });
  }
  else {
    res.status(500).json({ error: 'No SID available' });
  }
});

/* GET a metadate obj describing all user-configurable settings. */
router.get('/api/v1/meta', (req, res) => {
  // Create the default config for the metadate and respond.
  const defaults = new Defaults(Font.FONTS.NOTO_SERIF, Level.LEVELS.MEDIUM, Colors.DEFAULT);
  const metadata = new Metadata(fonts, levels, defaults)
  res.status(200).json( JSON.stringify(metadata) );
});

/* GET a list of supported fonts. */
router.get('/api/v1/fonts', (req, res) => {
  res.status(200).json( JSON.stringify(fonts) );
});

/* GET a list of games associated with the sid. */
router.get('/api/v1/:sid/games', (req, res) => {
  const sid = req.params.sid;
  const games = sessions.get(sid);
  
  if (games) {
    res.status(200).json( JSON.stringify(Array.from(games.values())) );
  }
  else {
    res.status(200).json( JSON.stringify(new Error(`No games associated with '${sid}'`)) );
  }
});

/* GET the game associated with sid and gid. */
router.get('/api/v1/:sid/games/:gid', (req, res) => {
  const sid = req.params.sid;
  const gid = req.params.gid;
  const games = sessions.get(sid);
  
  // Error checking in case session or game do not exist.
  if (games) {
    const game = games.get(gid);
    if (game) {
      res.status(200).json( JSON.stringify(game) );
    }
    else {
      const error = new Error(`The game '${gid}' is not associated with the session '${sid}'.`)
      res.status(200).json( JSON.stringify(error) );
    }
  }
  const error = new Error(`The session '${sid}' does not exist.`)
  res.status(200).json( JSON.stringify(error) );
});

/* POST a new game object assciated with the sid. */
router.post('/api/v1/:sid/games', async (req, res) => {
  // Get parameters from the request.
  const sid = req.params.sid;
  const font = req.headers['x-font'];
  const color = new Colors(req.body.guessColor, req.body.foreColor, req.body.wordColor);
  let level;
  if (req.query.level === "Easy") {
    level = Level.LEVELS.EASY;
  } 
  else if (req.query.level === "Medium") {
    level = Level.LEVELS.MEDIUM;
  }
  else {
    level = Level.LEVELS.HARD;
  }

  // Get the target word.
  let targetWord = await getWordFromList(level.minLength, level.maxLength);
  targetWord = targetWord.toUpperCase();
  let games;

  if (sessions.has(sid)) {
    // Get the map of games already associated to the sessionID. 
    games = sessions.get(sid);
  }
  else {
    // Create a map of games associated with the sessionID.
    games = new Map();
    sessions.set(sid, games);
  }

  // Get the new id, create the game, add to the map of games.
  let id = games.size.toString();
  const newGame = new Game(color, font, id, level, targetWord);
  games.set(id, newGame);
  res.status(200).json( JSON.stringify(newGame) );
});

/* POST a new guess object. */
router.post('/api/v1/:sid/games/:gid/guesses', (req, res) => {
  const sid = req.params.sid;
  const gid = req.params.gid;
  const guess = req.query['guess'].toUpperCase();

  // Error checking in case session or game does not exist.
  const games = sessions.get(sid);
  if (games) {
    const game = games.get(gid.toString());
    if (game) {
      // Check if the new guess has already been guessed.
      if (game.guesses.includes(guess)) {
        /* Already guessed, do nothing... */
      }
      else if (game.target.includes(guess)) {
        // Guessed right. Add the new guess to the game obj and update the view.
        game.addGuess(guess);
        let newView = "";
        for (let i = 0; i < game.target.length; i++) {
          if (game.view[i] !== '_') {
            newView = newView.concat(game.view[i]);
          }
          else {
            if (guess === game.target[i]) {
              newView = newView.concat(guess);
            }
            else {
              newView = newView.concat('_');
            }
          }
        }
        game.view = newView;
      }
      else {
        // Guessed wrong. Add the guess to the guess list.
        game.addGuess(guess);
        game.remaining--;
      }

      // Determine the state of the game and return.
      if (!game.view.includes('_')) {
        game.status = Game.STATUSES.VICTORY;
      }
      else if (game.remaining == 0) {
        game.status = Game.STATUSES.LOSS;
      }
      res.status(200).json( JSON.stringify(game) );
    }
    else {
      // GameID not associated with the sessionID
      let error = new Error(`The game '${gid}' is not associated with the session '${sid}'.`)
      res.status(200).json( JSON.stringify(error) );
    }
  }
  // The sessionID does not exist.
  let error = new Error(`The session '${sid}' does not exist.`)
  res.status(200).json( JSON.stringify(error) );
});

module.exports = router;