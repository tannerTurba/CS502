var fs = require('fs');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var game = require('./game');
var defaults = require('./defaults');
var colors = require('./colors');
var level = require('./level');
var font = require('./font');
// var metadata = require('./metadata');

router.all('*', function(req, res, next) {
  console.log(req.method, req.path);
  next();
});

/* GET a metadate obj describing all user-configurable settings. */
router.get('/meta', async (req, res, next) => {

});

/* GET a list of supported fonts. */
router.get('/fonts', async (req, res, next) => {

});

/* GET a list of games. */
router.get('/users/:uid/games', async (req, res, next) => {

});

/* GET the game associated with the gid. */
router.get('/users/:uid/games/:gid', async (req, res, next) => {

});

/* POST a new game object. */
router.post('/users/:uid/games', async (req, res, next) => {

});

/* POST a new guess object. */
router.post('/users/:uid/games/:gid/guesses', async (req, res, next) => {

});

module.exports = router;