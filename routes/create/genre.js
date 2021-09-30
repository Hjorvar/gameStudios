const express = require('express');
const path = require('path');
const createGenre = require('../../db/create/createGenre');
const dbFile = path.join(__dirname, '../../db/gameStudios.db');

const router = express.Router();

// get studioTemplate page
router.get('/', (req, res) => {
  if (req.session.loggedin) {
    res.render('createUpdate/genres', { title: 'Create', action: 'create' });
	} else {
    console.log('einhver reyndi að koma hingað sem má það ekki'.red);
    res.redirect(301, '/' );
	}
});

router.post('/', (req, res) => {
  if (req.session.loggedin) {
    createGenre(dbFile, req.body.genreName);
    res.render('createUpdate/genres', { title: 'Create', action: 'create' });
  } else {
    console.log('einhver reyndi að koma hingað sem má það ekki'.red);
    res.redirect(301, '/' );
	}
});

module.exports = router;
