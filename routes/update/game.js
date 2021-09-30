const express = require('express');
const path = require('path');
const deleteGameGenre = require('../../db/delete/deleteGameGenre');
const deleteGamePlatforms = require('../../db/delete/deleteGamePlatforms');
const findGame = require('../../db/read/findGame');
const findGameGenre = require('../../db/read/findGameGenre');
const findGamePlatforms = require('../../db/read/findGamePlatforms');
const readGenres = require('../../db/read/readGenres');
const readStudios = require('../../db/read/readStudios');
const readPlatforms = require('../../db/read/readPlatforms');
const readPublishers = require('../../db/read/readPublishers');
const updateGame = require('../../db/update/updateGame');
const updateGamePublisher = require('../../db/update/updateGamePublisher');
const dbFile = path.join(__dirname, '../../db/gameStudios.db');

const router = express.Router();

// get studioTemplate page
router.get('/', (req, res) => {
  if (req.session.loggedin) {
    const genres = readGenres(dbFile);
    const studios = readStudios(dbFile);
    const platforms = readPlatforms(dbFile); 
    const publishers = readPublishers(dbFile);
    const game = findGame(dbFile, req.query.idGame);
    const gameGenres = findGameGenre(dbFile, req.query.idGame);
    const gamePlatforms = findGamePlatforms(dbFile, req.query.idGame);
    console.log(game);
    res.render('createUpdate/game', { title: 'Update', action: 'Update', game, genres, studios, platforms, publishers, gameGenres, gamePlatforms });
  } else {
    console.log('einhver reyndi að koma hingað sem má það ekki'.red);
    res.redirect(301, '/' );
	}
});

router.post('/', (req, res) => {
  updateGame(dbFile, req.body.idGame, req.body.gameName,req.body.info ,req.body.ytTrailer ,req.body.year, req.body.month, req.body.idStudio);
  updateGamePublisher(dbFile, req.body.idGame, req.body.publishers)
  deleteGameGenre(idGame);
  deleteGamePlatforms(idGame)
  const genres = req.body.genres;
  for (let i = 0; i < genres.length; i += 1){
    createGameGenre(dbFile, idGame, genres[i]);
  }
  
  const platforms = req.body.platforms;
  for (let i = 0; i < platforms.length; i += 1){
    createGamePlatforms(dbFile, idGame, platforms[i]);
  }
  res.redirect('/games');
});

module.exports = router;
