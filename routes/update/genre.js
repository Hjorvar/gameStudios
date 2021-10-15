const express = require('express');
const path = require('path');

const dbFile = path.join(__dirname, '../../db/gameStudios.db');
const isLoggedin = require('../../functions/isLoggedin');

const router = express.Router();

// get studioTemplate page
router.get('/', (req, res) => {
  const username = isLoggedin(req.session);
  res.render('createUpdate/genres', { title: 'Create', action: 'create', username });
});

router.post('/', (req, res) => {
  res.json(req.body);
});

module.exports = router;
