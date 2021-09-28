const express = require('express');
// const path = require('path');
// const sqlite3 = require('sqlite3').verbose();

// const dbFile = path.join(__dirname, '../db/gameStudios.db');

const router = express.Router();

// get index page
router.get('/', (req, res) => {
  if (req.session.loggedin) {
    const username = req.session.username;
    res.render('index', { title: 'Front page', username });
	} else {
    const username = 'none';
    res.render('index', { title: 'Front page', username });
	}
});

module.exports = router;
