const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const dbFile = path.join(__dirname, '../db/gameStudios.db');
const colors = require('colors');

const router = express.Router();


// get studioTemplate page
router.get('/', (req, res) => {
  res.redirect('/');
});

router.post('/', (req, res) => {

  const user = [req.body.user, req.body.password];
  const sql = 'SELECT username FROM users WHERE username = ? AND password = ?;';
  const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
      return console.error(colors.red(err.message));
    }
    console.log('Connected to the SQLite database'.green);
    return true;
  });

  db.get(sql, user, (err, row) => {
    if (err) {
      return console.log(colors.red(err.message));
    }
    console.log('Reading data from table'.green);
    if(row){
      req.session.loggedin = true;
      req.session.username = row.username;
      res.redirect('/');
    } else {
      res.send('Incorrect Username and/or Password!');
    }
  
    return true;
  });;

  db.close((err) => {
    if (err) {
      return console.error(colors.red(err.message));
    }
    console.log('Close the database connection'.green);
    return true;
  });
});

module.exports = router;
