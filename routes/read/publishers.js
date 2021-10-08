const express = require('express');
const path = require('path');
const readPublishers = require('../../db/read/readPublishers');
const dbFile = path.join(__dirname, '../../db/gameStudios.db');

const router = express.Router();

// get index page
router.get('/', (req, res) => {
  let username = 'none';
  if (req.session.loggedin) {
    username = req.session.username;
	}

  const publishers = readPublishers(dbFile);
  res.render('read/publishers', { title: 'Publishers', publishers, username });

});

module.exports = router;
