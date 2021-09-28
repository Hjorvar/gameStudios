const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const dbFile = path.join(__dirname, '../../db/gameStudios.db');
const colors = require('colors');

const router = express.Router();

function createGenre(dbFile, name){
  const studio = [name];
  const sql = 'INSERT INTO genres(name) VALUES (?)';
  const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
      return console.error(colors.red(err.message));
    }
    console.log('Connected to the SQLite database'.green);
    return true;
  });

  db.run(sql, studio, (err) => {
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
  res.render('createUpdate/genres', { title: 'Create', action: 'create' });
});

router.post('/', (req, res) => {

  createGenre(dbFile, req.body.genreName);
  res.json(req.body);
});

module.exports = router;
