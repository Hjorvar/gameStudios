const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const readGenres = require('../../db/read/readGenres');
const readStudios = require('../../db/read/readStudios');
const readPlatforms = require('../../db/read/readPlatforms');
const readPublishers = require('../../db/read/readPublishers');
const dbFile = path.join(__dirname, '../../db/gameStudios.db');

const router = express.Router();

function updateGame(dbFile, id, name, year, month, idStudio, ytTrailer, info){
  const game = [name, year, month, idStudio, ytTrailer, info, id];
  const sql = 'UPDATE games SET name = ?, year = ?, month = ?, idStudio = ?, youtubeTrailer = ?, info = ? WHERE id = ?';
  const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
      return console.error(colors.red(err.message));
    }
    console.log('Connected to the SQLite database'.green);
    return true;
  });

  db.run(sql, game, (err) => {
    if (err) {
      return console.log(colors.red(err.message));
    }
    console.log(colors.green(game) + ' added to DB');
    return true;
  });

  db.close((err) => {
    if (err) {
      return console.error(colors.red(err.message));
    }
    console.log('Close the database connection'.green);
    return true;
  });
}

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
  // const idGame = req.query.idGame;
  // const sql = `SELECT * FROM games WHERE id = ?`;

  // const db = new sqlite3.Database(dbFile, (err) => {
  //   if (err) {
  //     return console.error(colors.red(err.message));
  //   }
  //   console.log('Connected to the SQLite database'.green);
  //   return true;
  // });

  // db.get(sql, [idGame], (err, row) => {
  //   if (err) {
  //     return console.error(err.message);
  //   }
  //   res.render('createUpdate/game', { title: 'Update', action: 'update', row });
  //   return row
  // });

  // db.close((err) => {
  //   if (err) {
  //     return console.error(colors.red(err.message));
  //   }
  //   console.log('Close the database connection'.green);
  //   return true;
  // });
});

router.post('/', (req, res) => {
  updateGame(dbFile, req.body.idGame, req.body.gameName, req.body.year, req.body.month, req.body.idStudio, req.body.ytTrailer, req.body.info);
  res.redirect('/games');
});

module.exports = router;
