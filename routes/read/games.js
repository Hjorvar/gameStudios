const express = require('express');
const path = require('path');
const readGenres = require('../../db/readGenres');
const readGames = require('../../db/readGames');

const dbFile = path.join(__dirname, '../../db/gameStudios.db');

const router = express.Router();

// get index page
router.get('/', (req, res) => {
  let username = 'none';
  if (req.session.loggedin) {
    username = req.session.username;
	}

  const genres = readGenres(dbFile);
  let where = 'WHERE 1 = 1';
  if(req.query.idPlatform == "Xbox"){
    where += ' AND platforms.name = "Xbox Series" OR platforms.name = "Xbox One"';
  }
  if(req.query.idPlatform == "PS"){
    where += ' AND platforms.name = "Playstation 5" or platforms.name = "Playstation 4"';
  }
  if(req.query.genres){
    const tempGenres = req.query.genres;
    where += ' AND (';
    for (let i = 0; i < tempGenres.length; i += 1){
      where +=  ` genres.id = ${tempGenres[i]}`
      if((i + 1) < tempGenres.length){
        where += ' AND';
      }
    }
    where += ' )'
  }
  if(req.query.sliderMin){
    if (req.query.sliderMin != "2015" || req.query.sliderMax != "2030"){
      where += ` AND year BETWEEN ${req.query.sliderMin} AND ${req.query.sliderMax}`;
    }
  }
  const games = readGames(dbFile, where)
  res.render('read/games', { title: 'Games', games, genres, username });
});

module.exports = router;
