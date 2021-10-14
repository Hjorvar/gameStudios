const express = require('express');
const path = require('path');
const deleteStudio = require('../../db/delete/deleteStudio');
const dbFile = path.join(__dirname, '../../db/gameStudios.db');


const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/');
});

router.post('/', (req, res) => {
  deleteStudio(dbFile, req.body.idStudio);
  res.redirect('/studios');
});

module.exports = router;
