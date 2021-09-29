const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const dbFile = path.join(__dirname, '../../db/gameStudios.db');
const colors = require('colors');

const router = express.Router();

function createGame(dbFile, name, year, month, idStudio, ytTrailer, info){
  const game = [name, year, month, idStudio, ytTrailer, info];
  const sql = 'INSERT INTO games(name, year, month, idStudio, ytTrailer, info) VALUES (?, ?, ?, ?, ?, ?)';
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
    console.log(colors.green(studio) + ' added to DB');
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
    const sql = 'SELECT id, name FROM studios ORDER BY name';
    let studios = [];
    let genres = [];
    let publishers = [];

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
        studios.push(row);
      })

      const sql = 'SELECT id, name FROM genres ORDER BY name';

      db.all(sql, [], (err, rows) => {
        if (err) {
          return console.log(colors.red(err.message));
        }
        console.log('Reading data from table'.green);
        rows.forEach((row) => {
          genres.push(row);
        });

        const sql = 'SELECT id, name FROM publishers ORDER BY name';
  
        db.all(sql, [], (err, rows) => {
          if (err) {
            return console.log(colors.red(err.message));
          }
          console.log('Reading data from table'.green);
          rows.forEach((row) => {
            publishers.push(row);
          });

          res.render('createUpdate/game', { title: 'Create', action: 'create', studios, genres, publishers });
          return true;
        });
      });
    });

    db.close((err) => {
      if (err) {
        return console.error(colors.red(err.message));
      }
      console.log('Close the database connection'.green);
      return true;
    });
  } else {
    console.log('einhver reyndi að koma hingað sem má það ekki'.red);
    res.redirect(301, '/' );
	}
});

router.post('/', (req, res) => {
  if (req.session.loggedin) {
    createGame(dbFile, req.body.gameName, req.body.year, req.body.month, req.body.idStudio, req.body.ytTrailer, req.body.info);
    res.render('createUpdate/game', { title: 'Create', action: 'create' });
  } else {
    console.log('einhver reyndi að koma hingað sem má það ekki'.red);
    res.redirect(301, '/' );
  }
});

module.exports = router;
