var express = require('express');
var session = require('express-session');
const cors = require('cors');
var mongoose = require('mongoose');

var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index.js');
var app = express();
var authentication = require('./routes/authentication');
var db = require('./routes/db');

// var createError = require('http-errors');
// var logger = require('morgan');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'MySecret',
  resave: true,
  saveUninitialized: true
}));

app.use('/', routes);
app.use('/', authentication);
app.use('/api/v2', routes);

mongoose.connect( 'mongodb://localhost:27017/hw3', {} )
  .then( x => {
    db.init();
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
