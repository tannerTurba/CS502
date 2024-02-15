var express = require('express');
var router = express.Router();

const sessions = new Map();
const fonts = [Font.FONTS.PROTEST_RIOT, Font.FONTS.ROBOTO, Font.FONTS.NOTO_SERIF];
const levels = [Level.LEVELS.EASY, Level.LEVELS.MEDIUM, Level.LEVELS.HARD];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
});

/* GET SID. */
router.get('api/v1/sid', function(req, res, next) {
  if (req.sessionID) {
    res.status(200).json({ sid: req.sessionID });
  }
  else {
    res.status(500).json({ error: 'No SID available' });
  }
});

/* GET a metadate obj describing all user-configurable settings. */
router.get('api/v1/meta', function(req, res, next) {
  // Create the default config for the metadate and respond.
  const defaults = new Defaults(Font.FONTS.NOTO_SERIF, Level.LEVELS.MEDIUM, Colors.DEFAULT);
  const metadata = new Metadata(fonts, levels, defaults)
  res.status(200).json( JSON.stringify(metadata) );
});

/* GET a list of supported fonts. */
router.get('api/v1/fonts', function(req, res, next) {
  res.status(200).json( JSON.stringify(fonts) );
});

/* GET a list of games associated with the sid. */
router.get('api/v1/:sid/games', function(req, res, next) {
  const sid = req.params.sid;
  const games = sessions.get(sid);

  if (games) {
    res.status(200).json( JSON.stringify(games.values().toArray()) );
  }
  else {
    res.status(500).json(`No games associated with '${sid}'`);
  }
});

/* GET the game associated with sid and gid. */
router.get('api/v1/:sid/games/:gid', function(req, res, next) {
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
router.post('api/v1/:sid/games', function(req, res, next) {
  // Get sessionID and the game obj from the request.
  const sid = req.params.sid;
  const level = new Level(req.query.rounds, req.query.minLength, req.query.maxLength, req.query.name);
  const font = req.headers['X-font'];
  const color = req.body;

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
  let id = games.length;
  const newGame = new Game(color, font, {}, id, level, {}, {}, {}, {}, {}, {});
  games.set(id, newGame);
});

/* POST a new guess object. */
router.post('api/v1/:sid/games/:gid/guesses', function(req, res, next) {
  const sid = req.params.sid;
  const gid = req.params.gid;
  const guess = req.query['guess'];
  let error;

  // Error checking in case session or game does not exist.
  const games = sessions.get(sid);
  if (games) {
    const game = games.get(gid);
    if (game) {
      // Add the guess and respond.
      game.addGuess(guess);
      res.status(200).json( JSON.stringify(game) );
    }
    else {
      error = new Error(`The game '${gid}' is not associated with the session '${sid}'.`)
      res.status(200).json( JSON.stringify(error) );
    }
  }
  error = new Error(`The session '${sid}' does not exist.`)
  res.status(200).json( JSON.stringify(error) );
});

module.exports = router;

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
  PROTEST_RIOT: new Font("sans-serif", "Protest Riot", "regular", "https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap"),
  ROBOTO: new Font("sans-serif", "Roboto", "regular", "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"),
  NOTO_SERIF: new Font("serif", "Noto Serif", "normal", "https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap")
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
  EASY: new Level(8, 3, 5, "easy"),
  MEDIUM: new Level(7, 4, 10, "medium"),
  HARD: new Level(6, 9, 300, "hard")
};

/**
 * The class to represent a Color object.
 */
class Colors {
  /**
   * Creates a Color object.
   * @param {string} guessBackground the color of the guess background.
   * @param {string} textBackground the color of the text background.
   * @param {string} wordBackground the color of the text.
   */
  constructor(guessBackground, textBackground, wordBackground) {
    this.guessBackground = guessBackground;
    this.textBackground = textBackground;
    this.wordBackground = wordBackground;
  }
}
/**
 * A predefined Color object that defines the default color values.
 */
Colors.DEFAULT = new Colors("#fefae0", "#606c38", "#283618");

/**
 * The class to represent a Metadata object.
 */
class Metadata {
  /**
   * Creates a Metadata object.
   * @param {List<Font>} fonts The fonts supported by the app.
   * @param {List<Level>} levels The levels supported by the app.
   * @param {Defaults} defaults The default settings of the app.
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
   * @param {string} guesses The guess the user has made.
   * @param {string} id A unique identifier for the game.
   * @param {Level} level The Level configuration.
   * @param {number} remaining The number of remaining rounds.
   * @param {string} status A string denoting the game's status.
   * @param {string} target The target word.
   * @param {number} timestamp The time the game was created.
   * @param {number} timeToComplete The number of milliseconds to complete the game.
   * @param {string} view The current guesses of the target word.
   */
  constructor(colors, font, guesses, id, level, remaining, status, target, timestamp, timeToComplete, view) {
    this.colors = colors;
    this.font = font;
    this.guesses = guesses;
    this.id = id;
    this.level = level;
    this.remaining = remaining;
    this.status = status;
    this.target = target;
    this.timestamp = timestamp;
    this.timeToComplete = timeToComplete;
    this.view = view;
  }

  /**
   * Adds a guess to the list of guessed letters.
   */
  addGuess = new function(guess) {
    this.guesses = this.guesses.concat(' ', guess);
  }
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