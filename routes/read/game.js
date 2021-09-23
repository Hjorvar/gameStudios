const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const colors = require('colors');

const dbFile = path.join(__dirname, '../../db/gameStudios.db');

const router = express.Router();

// get index page
router.get('/', (req, res) => {
	const sql = 'SELECT games.id ,games.name AS name, studios.name AS studioName, GROUP_CONCAT(genres.name) AS genresName, games.youtubeTrailer AS trailer, games.info AS info FROM games INNER JOIN gameGenres ON games.id = gameGenres.idGame INNER JOIN studios ON games.idStudio = studios.id INNER JOIN genres ON gameGenres.idGenre = genres.id WHERE games.id = ? GROUP BY games.id ORDER BY games.name;';
  let game = "";
	let gameId = req.query.idGame;

  const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
      return console.error(colors.red(err.message));
    }
    console.log('Connected to the SQLite database'.green);
    return true;
  });

  db.get(sql, [gameId], (err, row) => {
    if (err) {
      return console.log(colors.red(err.message));
    }
    console.log('Reading data from table'.green);
    game = row;
  
    // colors.yellow(console.log(studios));
    res.render('read/game', { title: 'Game', game });
    return true;
  });

  db.close((err) => {
    if (err) {
      return console.error(colors.red(err.message));
    }
    console.log('Close the database connection'.green);
    return true;
  });


});

module.exports = router;
