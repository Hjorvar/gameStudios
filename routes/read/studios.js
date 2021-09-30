const express = require('express');
const path = require('path');
const readStudios = require('../../db/read/readStudios');
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

});

module.exports = router;
