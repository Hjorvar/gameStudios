const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();

// get studioTemplate page
router.get('/', (req, res) => {
  res.redirect(301, '/' );
});

router.post('/', (req, res) => {
  const dbFile = path.join(__dirname, '../../db/gameStudios.db');
  const sql = 'DELETE FROM studios WHERE id = ?';
  let idStudio = req.body.idStudio;

  const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
      return console.error(colors.red(err.message));
    }
    console.log('Connected to the SQLite database'.green);
    return true;
  });

  db.run(sql, [idStudio], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect(301, '/' );
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

module.exports = router;
