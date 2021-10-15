const express = require('express');
const path = require('path');
const readPublishers = require('../../db/read/readPublishers');
const dbFile = path.join(__dirname, '../../db/gameStudios.db');
const isLoggedin = require('../../functions/isLoggedin');

const router = express.Router();

// get index page
router.get('/', (req, res) => {
  let username = isLoggedin(req.session);

  const publishers = readPublishers(dbFile);
  res.render('read/publishers', { title: 'Publishers', publishers, username });

});

module.exports = router;
