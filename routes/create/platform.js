const express = require('express');
const path = require('path');
const createPlatform = require('../../db/create/createPlatform');

const dbFile = path.join(__dirname, '../../db/gameStudios.db');
const isLoggedin = require('../../functions/isLoggedin');

const router = express.Router();

// get studioTemplate page
router.get('/', (req, res) => {
  const username = isLoggedin(req.session);
  if (username !== 'none') {
    res.render('createUpdate/platform', { title: 'Create', action: 'create', username });
  } else {
    res.redirect(301, '/');
  }
});

router.post('/', (req, res) => {
  const username = isLoggedin(req.session);
  if (username !== 'none') {
    createPlatform(dbFile, req.body.platformName);
    res.render('createUpdate/platform', { title: 'Create', action: 'create' });
  } else {
    res.redirect(301, '/');
  }
});

module.exports = router;
