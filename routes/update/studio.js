const express = require('express');
const path = require('path');
const dbFile = path.join(__dirname, '../../db/gameStudios.db');
const findStudio = require('../../db/read/findStudio');
const updateStudio = require('../../db/update/updateStudio');

const router = express.Router();

// get studioTemplate page
router.get('/', (req, res) => {
  const studio = findStudio(dbFile, req.query.idStudio)
  console.log(studio);
  res.render('createUpdate/studio', { title: `Update ${studio.name}`, action: 'update', studio });
});

router.post('/', (req, res) => {
  updateStudio(dbFile, req.body.idStudio, req.body.studioName, req.body.staffAmmount, req.body.city, req.body.country, req.body.founded, req.body.firstPartyOwner );
  res.redirect('/studios');
});

module.exports = router;
