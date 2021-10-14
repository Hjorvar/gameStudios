const express = require('express');
const path = require('path');
const dbFile = path.join(__dirname, '../../db/gameStudios.db');

const router = express.Router();

// get studioTemplate page
router.get('/', (req, res) => {
  res.render('createUpdate/genres', { title: 'Delete', action: 'delete' });
});

router.post('/', (req, res) => {
  res.json(req.body);
});

module.exports = router;
