const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const dbFile = path.join(__dirname, '../db/gameStudios.db');
const colors = require('colors');

const router = express.Router();

function createStudio(dbFile, name, city, country, staff, founded){
  const studio = [name, city, country, staff, founded];
  const sql = 'INSERT INTO studios(name, city, country, staffAmmount, founded) VALUES (?, ?, ?, ?, ?)';
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
  res.render('createUpdate/studio', { title: 'Create', action: 'create' });
});

router.post('/', (req, res) => {

  createStudio(dbFile, req.body.studioName, req.body.city, req.body.country, req.body.staffAmmount, req.body.founded);
  res.json(req.body);
});

module.exports = router;
