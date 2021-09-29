const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const dbFile = path.join(__dirname, '../../db/gameStudios.db');
const colors = require('colors');
const findStudio = require('../../db/findStudio');

const router = express.Router();


function updateStudio(dbFile, id, name, staffAmmount, city, country, founded){
  const studio = [name, staffAmmount, city, country, founded, id];
  const sql = 'UPDATE studios SET name = ?, staffAmmount = ?, city = ?, country = ?, founded = ?  WHERE id = ?';
  console.log(studio);

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
    console.log(`Row updated with new info: ${studio}`.green);
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
  const studio = findStudio(dbFile, req.query.idStudio)
  res.render('createUpdate/studio', { title: 'Update', action: 'update', studio });
});

router.post('/', (req, res) => {
  updateStudio(dbFile, req.body.idStudio, req.body.studioName, req.body.staffAmmount, req.body.city, req.body.country, req.body.founded );
  res.redirect('/studios');
});

module.exports = router;
