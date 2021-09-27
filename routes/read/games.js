const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const colors = require('colors');

const dbFile = path.join(__dirname, '../../db/gameStudios.db');

const router = express.Router();

// get index page
router.get('/', (req, res) => {
  let where = 'WHERE 1 = 1';
  if(req.query.idPlatform == "Xbox"){
    where += ' AND platforms.name = "Xbox Series" OR platforms.name = "Xbox One"';
  }
  if(req.query.idPlatform == "PS"){
    where += ' AND platforms.name = "Playstation 5" or platforms.name = "Playstation 4"';
  }
  if(req.query.genres){
    const tempGenres = req.query.genres;
    where += ' AND ('
    for (let i = 0; i < tempGenres.length; i += 1){
      where +=  ` genres.id = ${tempGenres[i]}`
      if((i + 1) < tempGenres.length){
        where += ' AND'
      }
    }
    where += ' )'
  }
  if(req.query.slider){
    if (req.query.slider != "2015"){
      where += ` AND estReleaseYear = ${req.query.slider}`;
    }
  }


  const sql = `SELECT games.id, games.name AS name, studios.name AS studioName, GROUP_CONCAT(genres.name) AS genresName FROM games INNER JOIN gameGenres ON games.id = gameGenres.idGame INNER JOIN studios ON games.idStudio = studios.id INNER JOIN genres ON gameGenres.idGenre = genres.id INNER JOIN gamePlatforms ON games.id = gamePlatforms.idGame INNER JOIN platforms ON gamePlatforms.idPlatform = platforms.id ${where} GROUP BY games.id ORDER BY games.name;`;
  let games = [];

  const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
      return console.error(colors.red(err.message));
    }
    console.log('Connected to the SQLite database'.green);
    return true;
  });

  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.log(colors.red(err.message));
    }
    console.log('Reading data from table'.green);
    rows.forEach((row) => {
      games.push(row);
    })

    const sql = 'SELECT id, name FROM genres ORDER BY name';
    let genres = [];

    db.all(sql, [], (err, rows) => {
      if (err) {
        return console.log(colors.red(err.message));
      }
      console.log('Reading data from table'.green);
      rows.forEach((row) => {
        genres.push(row);
      })

      res.render('read/games', { title: 'Games', games, genres });
      return true;
    })
  })

  db.close((err) => {
    if (err) {
      return console.error(colors.red(err.message));
    }
    console.log('Close the database connection'.green);
    return true;
  });

});

module.exports = router;
