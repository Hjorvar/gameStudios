const express = require('express');
const path = require('path');
const readGenres = require('../../db/read/readGenres');
const readGames = require('../../db/read/readGames');
const readPlatforms = require('../../db/read/readPlatforms');

const dbFile = path.join(__dirname, '../../db/gameStudios.db');
const isLoggedin = require('../../functions/isLoggedin');

const router = express.Router();

// get index page
router.get('/', (req, res) => {
  let username = isLoggedin(req.session);

  let where = 'WHERE 1 = 1';
  let search = [];
  let orderBy = "games.year, games.month, games.name ASC";

  const orderByModes = [
    "games.year, games.month, games.name",
    "games.year DESC, games.month DESC, games.name",
    "games.name ASC",
    "games.name DESC"
  ];
  if(req.query.orderby){
    orderBy = orderByModes[req.query.orderby - 1];
  }

  if(req.query.genres){
    const tempGenres = req.query.genres;
    where += ' AND (';
    for (let i = 0; i < tempGenres.length; i += 1){
      where += ' genres.id = ?';
      search.push(tempGenres[i])
      if((i + 1) < tempGenres.length){
        where += ' OR';
      }
    }
    where += ' )'
  }

  if(req.query.platforms){
    if(req.query.platforms != 'nothing'){
      const tempPlatforms = req.query.platforms;
      where += ' AND (';
      for (let i = 0; i < tempPlatforms.length; i += 1){
        where += 'platforms.id = ?';
        search.push(tempPlatforms[i]);
        if((i + 1) < tempPlatforms.length){
          where += ' OR';
        }
      }
      where += ' )';
    }
  }
  if(req.query.sliderMin){
    if (req.query.sliderMin != "2015" || req.query.sliderMax != "2030"){
      // where += ` AND year BETWEEN ${req.query.sliderMin} AND ${req.query.sliderMax}`;
      where += ' AND year BETWEEN ? AND ? ';
      search.push(req.query.sliderMin);
      search.push(req.query.sliderMax);
    }
  }
  if(req.query.studio){
    where += ' AND studios.id = ?';
    search.push(req.query.studio);
  }
  if(req.query.publisher){
    where += ' AND gamePublishers.idPublisher = ?';
    search.push(req.query.publisher);
  }
  if(req.query.search){
    where += ` AND games.name LIKE ? `;
    search.push('%'+req.query.search+'%');
  }
  const genres = readGenres(dbFile);
  const games = readGames(dbFile, where, search, orderBy);
  const platforms = readPlatforms(dbFile);
  res.render('read/games', { title: 'Games', games, genres, username, platforms });
});

module.exports = router;
