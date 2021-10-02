const express = require('express');
const path = require('path');
const readGenres = require('../../db/read/readGenres');
const readGames = require('../../db/read/readGames');
const readPlatforms = require('../../db/read/readPlatforms');

const dbFile = path.join(__dirname, '../../db/gameStudios.db');

const router = express.Router();

// get index page
router.get('/', (req, res) => {
  let username = 'none';
  if (req.session.loggedin) {
    username = req.session.username;
	}



  let where = 'WHERE 1 = 1';
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
  if(req.query.platforms){
    const tempPlatforms = req.query.platforms;
    where += ' AND (';
    for (let i = 0; i < tempPlatforms.length; i += 1){
      where +=  ` platforms.id = ${tempPlatforms[i]}`
      if((i + 1) < tempPlatforms.length){
        where += ' OR';
      }
    }
    where += ' )'
  }
  if(req.query.sliderMin){
    if (req.query.sliderMin != "2015" || req.query.sliderMax != "2030"){
      where += ` AND year BETWEEN ${req.query.sliderMin} AND ${req.query.sliderMax}`;
    }
  }

  const genres = readGenres(dbFile);
  const games = readGames(dbFile, where);
  const platforms = readPlatforms(dbFile);
  console.log(platforms);
  res.render('read/games', { title: 'Games', games, genres, username, platforms });
});

module.exports = router;
