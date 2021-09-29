const express = require('express');
const path = require('path');
const createPlatform = require('../../db/createPlatform');
const dbFile = path.join(__dirname, '../../db/gameStudios.db');

const router = express.Router();



// get studioTemplate page
router.get('/', (req, res) => {
  console.log('mamma');
  if (req.session.loggedin) {
    res.render('createUpdate/platform', { title: 'Create', action: 'create' });
	} else {
    console.log('einhver reyndi að koma hingað sem má það ekki'.red);
    res.redirect(301, '/' );
	}
});

router.post('/', (req, res) => {
  console.log('pabbi');
  if (req.session.loggedin) {
    createPlatform(dbFile, req.body.platformName);
    res.render('createUpdate/platform', { title: 'Create', action: 'create' });
    } else {
      console.log('einhver reyndi að koma hingað sem má það ekki'.red);
      res.redirect(301, '/' );
	}
});

module.exports = router;
