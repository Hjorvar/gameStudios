const express = require('express');
const path = require('path');
const Worker = require('../db/Worker');
const db = new Worker(path.join(__dirname, '../db/gameStudios.db'));

const router = express.Router();

// get studioTemplate page
router.get('/', (req, res) => {
  res.render('createUpdate/studio', { title: 'Create', action: 'create' });
});

router.post('/', (req, res) => {
  db.createStudio(req.body.studioName);
  res.json(req.body);
});

module.exports = router;
