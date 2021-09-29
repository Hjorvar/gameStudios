const express = require('express');
const path = require('path');
const createGame = require('../../db/createGame');
const createGameGenre = require('../../db/createGameGenre');
const createGamePlatforms = require('../../db/createGamePlatforms');
const createGamePublishers = require('../../db/createGamePublishers');
const readGenres = require('../../db/readGenres');
const readStudios = require('../../db/readStudios');
const readPlatforms = require('../../db/readPlatforms');
const readPublishers = require('../../db/readPublishers');
const dbFile = path.join(__dirname, '../../db/gameStudios.db');

const router = express.Router();



// get studioTemplate page
router.get('/', (req, res) => {

  if (req.session.loggedin) {

    const genres = readGenres(dbFile);
    const studios = readStudios(dbFile);
    const platforms = readPlatforms(dbFile); 
    const publishers = readPublishers(dbFile);
    res.render('createUpdate/game', { title: 'Create', action: 'create', studios, genres, platforms, publishers });

  } else {
    console.log('einhver reyndi að koma hingað sem má það ekki'.red);
    res.redirect(301, '/' );
	}
});

router.post('/', (req, res) => {
  if (req.session.loggedin) {
    const idGame = createGame(dbFile, req.body.gameName,req.body.studios, req.body.info, req.body.ytTrailer, req.body.year, req.body.month );
    createGamePublishers(dbFile, idGame, req.body.publishers);
    
    const genres = req.body.genres;
    for (let i = 0; i < genres.length; i += 1){
      createGameGenre(dbFile, idGame, genres[i]);
    }
    
    const platforms = req.body.platforms;
    for (let i = 0; i < platforms.length; i += 1){
      createGamePlatforms(dbFile, idGame, platforms[i]);
    }

    res.render('createUpdate/game', { title: 'Create', action: 'create' });
  } else {
    console.log('einhver reyndi að koma hingað sem má það ekki'.red);
    res.redirect(301, '/' );
  }
});

module.exports = router;
