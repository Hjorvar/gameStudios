const express = require('express');
const path = require('path');

const dbFile = path.join(__dirname, '../../db/gameStudios.db');
const isLoggedin = require('../../functions/isLoggedin');
const findStudio = require('../../db/read/findStudio');
const updateStudio = require('../../db/update/updateStudio');

const router = express.Router();

// get studioTemplate page
router.get('/', (req, res) => {
  const username = isLoggedin(req.session);
  const studio = findStudio(dbFile, req.query.idStudio);
  res.render('createUpdate/studio', {
    title: `Update ${studio.name}`, action: 'update', studio, username,
  });
});

router.post('/', (req, res) => {
  updateStudio(dbFile, req.body.idStudio, req.body.studioName, req.body.staffAmmount,
    req.body.city, req.body.country, req.body.founded, req.body.firstPartyOwner);
  res.redirect('/studios');
});

module.exports = router;
