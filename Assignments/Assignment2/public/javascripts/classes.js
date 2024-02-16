
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
  EASY: new Level(8, 3, 5, "Easy"),
  MEDIUM: new Level(7, 4, 10, "Medium"),
  HARD: new Level(6, 9, 300, "Hard")
};

/**
 * The class to represent a Color object.
 */
export default class Colors {
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

module.exports.Font = Font;
module.exports.Level = Level;
module.exports.Colors = Colors;
module.exports.Metadata = Metadata;
module.exports.Defaults = Defaults;
module.exports.Game = Game;
module.exports.Error = Error;