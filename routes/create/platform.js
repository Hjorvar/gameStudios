const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const dbFile = path.join(__dirname, '../../db/gameStudios.db');
const colors = require('colors');

const router = express.Router();

function createPlatform(dbFile, name){
  const platform = [name];
  const sql = 'INSERT INTO platforms(name) VALUES (?)';
  const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
      return console.error(colors.red(err.message));
    }
    console.log('Connected to the SQLite database'.green);
    return true;
  });

  db.run(sql, platform, (err) => {
    if (err) {
      return console.log(colors.red(err.message));
    }
    console.log(colors.green(platform) + ' added to DB');
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
  console.log('mamma');
  if (req.session.loggedin) {
    res.render('createUpdate/platform', { title: 'Create', action: 'create' });
	} else {
    console.log('einhver reyndi að koma hingað sem má það ekki'.red);
    res.redirect(301, '/' );
	}
});

router.post('/', (req, res) => {
  console.log('pabbi');
  if (req.session.loggedin) {
    createPlatform(dbFile, req.body.platformName);
    res.render('createUpdate/platform', { title: 'Create', action: 'create' });
    } else {
      console.log('einhver reyndi að koma hingað sem má það ekki'.red);
      res.redirect(301, '/' );
	}
});

module.exports = router;
