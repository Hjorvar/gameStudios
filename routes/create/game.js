const express = require('express');
const path = require('path');
const createGame = require('../../db/create/createGame');
const createGameGenre = require('../../db/create/createGameGenre');
const createGamePlatforms = require('../../db/create/createGamePlatforms');
const createGamePublishers = require('../../db/create/createGamePublishers');
const readGenres = require('../../db/read/readGenres');
const readStudios = require('../../db/read/readStudios');
const readPlatforms = require('../../db/read/readPlatforms');
const readPublishers = require('../../db/read/readPublishers');
const dbFile = path.join(__dirname, '../../db/gameStudios.db');

const router = express.Router();



// get studioTemplate page
router.get('/', (req, res) => {

  if (req.session.loggedin) {
    const genres = readGenres(dbFile);
    const studios = readStudios(dbFile);
    const platforms = readPlatforms(dbFile); 
    const publishers = readPublishers(dbFile);
    res.render('createUpdate/game', { title: 'Create Game', action: 'create', studios, genres, platforms, publishers });
  } else {
    console.log('einhver reyndi að koma hingað sem má það ekki'.red);
    res.redirect(301, '/' );
	}
});

router.post('/', (req, res) => {
  if (req.session.loggedin) {
    const idGame = createGame(dbFile, req.body.gameName,req.body.studios, req.body.info, req.body.ytTrailer, req.body.year, req.body.month );
    createGamePublishers(dbFile, idGame, req.body.publishers);
    
    const genresPicked = req.body.genres;
    for (let i = 0; i < genresPicked.length; i += 1){
      createGameGenre(dbFile, idGame, genresPicked[i]);
    }
    
    const platformsPicked = req.body.platforms;
    for (let i = 0; i < platformsPicked.length; i += 1){
      createGamePlatforms(dbFile, idGame, platformsPicked[i]);
    }
    const genres = readGenres(dbFile);
    const studios = readStudios(dbFile);
    const platforms = readPlatforms(dbFile); 
    const publishers = readPublishers(dbFile);
    res.render('createUpdate/game', { title: 'Create Game', action: 'create', studios, genres, platforms, publishers });  } else {
    console.log('einhver reyndi að koma hingað sem má það ekki'.red);
    res.redirect(301, '/' );
  }
});

module.exports = router;
