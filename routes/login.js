const express = require('express');
const path = require('path');
const findUser = require('../db/read/findUser');

const dbFile = path.join(__dirname, '../db/gameStudios.db');

const router = express.Router();

// get studioTemplate page
router.get('/', (req, res) => {
  res.redirect('/');
});

router.post('/', (req, res) => {
  // const user = [req.body.user, req.body.password];
  const user = findUser(dbFile, req.body.user, req.body.password);
  if (user) {
    req.session.loggedin = true;
    req.session.username = user.username;
    res.redirect('/');
  } else {
    res.send('Incorrect Username and/or Password!');
  }
});

module.exports = router;
