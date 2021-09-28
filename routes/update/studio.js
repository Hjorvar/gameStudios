const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const dbFile = path.join(__dirname, '../../db/gameStudios.db');
const colors = require('colors');

const router = express.Router();

// get studioTemplate page
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM studios ORDER BY name';
  let idStudio = req.body.idStudio;

  const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
      return console.error(colors.red(err.message));
    }
    console.log('Connected to the SQLite database'.green);
    return true;
  });

  db.get(sql, [idStudio], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.render('createUpdate/studio', { title: 'Update', action: 'update', row });
    return row
  });

  db.close((err) => {
    if (err) {
      return console.error(colors.red(err.message));
    }
    console.log('Close the database connection'.green);
    return true;
  });
});

router.post('/', (req, res) => {
  db.updateStudio(1, req.body.studioName);
  res.json(req.body);
});

module.exports = router;
