const express = require('express');
const path = require('path');
// const sqlite3 = require('sqlite3').verbose();
const readStudios = require('../../db/readStudios');
const dbFile = path.join(__dirname, '../../db/gameStudios.db');

const router = express.Router();

// get index page
router.get('/', (req, res) => {
  let username = 'none';
  if (req.session.loggedin) {
    username = req.session.username;
	}

  const studios = readStudios(dbFile);
  res.render('read/studios', { title: 'Studios', studios, username });


  // const sql = 'SELECT id, name, country, city, staffAmmount FROM studios ORDER BY name';
  // let studios = [];

  // const db = new sqlite3.Database(dbFile, (err) => {
  //   if (err) {
  //     return console.error(colors.red(err.message));
  //   }
  //   console.log('Connected to the SQLite database'.green);
  //   return true;
  // });

  // db.all(sql, [], (err, rows) => {
  //   if (err) {
  //     return console.log(colors.red(err.message));
  //   }
  //   console.log('Reading data from table'.green);
  //   rows.forEach((row) => {
  //     studios.push(row);
  //   })

  //   res.render('read/studios', { title: 'Studios', studios, username });
  //   return true;
  // });

  // db.close((err) => {
  //   if (err) {
  //     return console.error(colors.red(err.message));
  //   }
  //   console.log('Close the database connection'.green);
  //   return true;
  // });

  // res.render('read/studios', { title: 'Studios', studios, username });

});

module.exports = router;
