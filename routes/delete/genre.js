const express = require('express');
const path = require('path');
const dbFile = path.join(__dirname, '../../db/gameStudios.db');

const router = express.Router();

// get studioTemplate page
router.get('/', (req, res) => {
  res.redirect('/');
});

router.post('/', (req, res) => {
  res.redirect('/');
});

module.exports = router;
