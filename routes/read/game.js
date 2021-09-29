const express = require('express');
const path = require('path');
const readGame = require('../../db/readGame');
const dbFile = path.join(__dirname, '../../db/gameStudios.db');

const router = express.Router();

// get index page
router.get('/', (req, res) => {
  const game = readGame(dbFile, req.query.idGame);
  res.render('read/game', { title: 'Game', game });


});

module.exports = router;
