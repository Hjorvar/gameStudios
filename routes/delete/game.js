const express = require('express');
const path = require('path');
const deleteGame = require('../../db/delete/deleteGame');
const deleteGameGenre = require('../../db/delete/deleteGameGenre');
const deleteGamePublisher = require('../../db/delete/deleteGamePublisher');
const deleteGamePlatforms = require('../../db/delete/deleteGamePlatforms');
const dbFile = path.join(__dirname, '../../db/gameStudios.db');

const router = express.Router();


// get studioTemplate page
router.get('/', (req, res) => {
  res.redirect('/');
});

router.post('/', (req, res) => {
  deleteGameGenre(dbFile, req.body.idGame);
  deleteGamePublisher(dbFile, req.body.idGame);
  deleteGamePlatforms(dbFile, req.body.idGame);
  deleteGame(dbFile, idGame);
  res.redirect('/games');
});

module.exports = router;
