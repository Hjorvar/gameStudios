const express = require('express');
const path = require('path');
const createGameGenre = require('../../db/create/createGameGenre');
const createGamePlatforms = require('../../db/create/createGamePlatforms');
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
const isLoggedin = require('../../functions/isLoggedin');

const router = express.Router();

// get studioTemplate page
router.get('/', (req, res) => {
  let username = isLoggedin(req.session);
  if (username != 'none') {
    // skíta mix, laga betur seinna
    const where = 'WHERE 1 = 1';
    const search = []; 
    const genres = readGenres(dbFile);
    const studios = readStudios(dbFile, where, search);
    const platforms = readPlatforms(dbFile); 
    const publishers = readPublishers(dbFile);
    const game = findGame(dbFile, req.query.idGame);
    const gameGenres = findGameGenre(dbFile, req.query.idGame);
    const gamePlatforms = findGamePlatforms(dbFile, req.query.idGame);
    res.render('createUpdate/game', { title: `Update ${game.name}`, action: 'Update', game, genres, studios, platforms, publishers, gameGenres, gamePlatforms, username });
  } else {
    res.redirect(301, '/' );
	}
});

router.post('/', (req, res) => {
  updateGame(dbFile, req.body.idGame, req.body.gameName,req.body.info ,req.body.ytTrailer ,req.body.year, req.body.month, req.body.studios, req.body.opencritic);
  updateGamePublisher(dbFile, req.body.idGame, req.body.publishers)
  deleteGameGenre(dbFile, req.body.idGame);
  deleteGamePlatforms(dbFile, req.body.idGame)
  
  const genresPicked = req.body.genres;
  if (Array.isArray(genresPicked)){
    for (let i = 0; i < genresPicked.length; i += 1){
      createGameGenre(dbFile, req.body.idGame, genresPicked[i]);
    }
  } else {
    createGameGenre(dbFile, req.body.idGame, genresPicked);
  }

  const platformsPicked = req.body.platforms;
  if (Array.isArray(platformsPicked)){
    for (let i = 0; i < platformsPicked.length; i += 1){
      createGamePlatforms(dbFile, req.body.idGame, platformsPicked[i]);
    }
  } else {
    createGamePlatforms(dbFile, req.body.idGame, platformsPicked);
  }
  res.redirect('/games');
});

module.exports = router;
