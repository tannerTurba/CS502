var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

const { Font, Level, Colors, Metadata, Defaults, Game, Error } = require('./public/javascripts/classes.js');

// var router = require('./routes/index.js');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'MySecret',
  resave: false,
  saveUninitialized: true
}));

// app.use('/', router);
// app.use('/api/v1/sid', router);
// app.use('/api/v1/meta', router);
// app.use('/api/v1/fonts', router);
// app.use('/api/v1/:sid/games/:gid', router);
// app.use('/api/v1/:sid/games', router);
// app.use('/api/v1/:sid/games/:gid/guesses', router);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

const sessions = new Map();
const fonts = [Font.FONTS.PROTEST_RIOT, Font.FONTS.ROBOTO, Font.FONTS.NOTO_SERIF];
const levels = [Level.LEVELS.EASY, Level.LEVELS.MEDIUM, Level.LEVELS.HARD];

/* GET home page. */
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
});

/* GET SID. */
app.get('/api/v1/sid', (req, res) => {
  if (req.sessionID) {
    res.status(200).json({ sid: req.sessionID });
  }
  else {
    res.status(500).json({ error: 'No SID available' });
  }
});

/* GET a metadate obj describing all user-configurable settings. */
app.get('/api/v1/meta', (req, res) => {
  // Create the default config for the metadate and respond.
  const defaults = new Defaults(Font.FONTS.NOTO_SERIF, Level.LEVELS.MEDIUM, Colors.DEFAULT);
  const metadata = new Metadata(fonts, levels, defaults)
  res.status(200).json( JSON.stringify(metadata) );
});

/* GET a list of supported fonts. */
app.get('/api/v1/fonts', (req, res) => {
  res.status(200).json( JSON.stringify(fonts) );
});

/* GET a list of games associated with the sid. */
app.get('/api/v1/:sid/games', (req, res) => {
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
app.get('/api/v1/:sid/games/:gid', (req, res) => {
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
app.post('/api/v1/:sid/games', (req, res) => {
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
app.post('/api/v1/:sid/games/:gid/guesses', (req, res) => {
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

module.exports = app;
