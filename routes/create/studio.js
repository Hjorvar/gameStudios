const express = require('express');
const path = require('path');
const dbFile = path.join(__dirname, '../../db/gameStudios.db');
const createStudio = require('../../db/create/createStudio');

const { runInNewContext } = require('vm'); // einhver að nota þetta? kv. hjörvar

const router = express.Router();

// get studioTemplate page
router.get('/', (req, res) => {
  if (req.session.loggedin) {
    res.render('createUpdate/studio', { title: 'Create Studio', action: 'create' });
  } else {
    res.redirect(301, '/' );
	}
});

router.post('/', (req, res) => {
  if (req.session.loggedin) {
    createStudio(dbFile, req.body.studioName, req.body.city, req.body.country, req.body.staffAmmount, req.body.founded, req.body.firstPartyOwner);
    res.render('createUpdate/studio', { title: 'Create Studio', action: 'create' });
  } else {
    res.redirect(301, '/' );
	}

});

module.exports = router;
