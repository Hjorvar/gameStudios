const express = require('express');
const path = require('path');

const dbFile = path.join(__dirname, '../../db/gameStudios.db');
const createStudio = require('../../db/create/createStudio');
const isLoggedin = require('../../functions/isLoggedin');

const router = express.Router();

// get studioTemplate page
router.get('/', (req, res) => {
  const username = isLoggedin(req.session);
  if (username !== 'none') {
    res.render('createUpdate/studio', { title: 'Create Studio', action: 'create', username });
  } else {
    res.redirect(301, '/');
  }
});

router.post('/', (req, res) => {
  const username = isLoggedin(req.session);
  if (username !== 'none') {
    createStudio(dbFile, req.body.studioName, req.body.city, req.body.country,
      req.body.staffAmmount, req.body.founded, req.body.firstPartyOwner);
    res.render('createUpdate/studio', { title: 'Create Studio', action: 'create' });
  } else {
    res.redirect(301, '/');
  }
});

module.exports = router;
