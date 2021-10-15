const express = require('express');
const path = require('path');
const readGame = require('../../db/read/readGame');

const dbFile = path.join(__dirname, '../../db/gameStudios.db');
const isLoggedin = require('../../functions/isLoggedin');

const router = express.Router();

// get index page
router.get('/', (req, res) => {
  const username = isLoggedin(req.session);
  const game = readGame(dbFile, req.query.idGame);
  res.render('read/game', { title: 'Game', game, username });
});

module.exports = router;
