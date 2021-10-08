const express = require('express');
const path = require('path');
const readGames = require('../db/read/readGames');

const dbFile = path.join(__dirname, '../db/gameStudios.db');

const router = express.Router();

// get index page
router.get('/', (req, res) => {
  const currentDate = new Date;
  let where = 'WHERE month IN (?, ?) AND year = ?';
  let search = []
  const orderBy = "games.year, games.month, games.name ASC";
  let username = 'none';
  search.push(currentDate.getMonth() + 1);
  if (currentDate.getMonth() + 1 == 12) {
    // So the next month isn't 13
    // Note: getMonth starts on 0
    where += ' OR year = ?';
    search.push(1);  // Push January
    search.push(currentDate.getFullYear());
    search.push(currentDate.getFullYear() + 1);
  } else {
    search.push(currentDate.getMonth() + 2);
    search.push(currentDate.getFullYear());
  }
  const games = readGames(dbFile, where, search, orderBy);
  if (req.session.loggedin) {
    username = req.session.username;
	}
  res.render('index', { title: 'Front page', username, games });
});

module.exports = router;
