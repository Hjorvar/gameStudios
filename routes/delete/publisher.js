const express = require('express');
const path = require('path');
const deletePublisher = require('../../db/delete/deletePublisher');
const dbFile = path.join(__dirname, '../../db/gameStudios.db');


const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/');
});

router.post('/', (req, res) => {
  deletePublisher(dbFile, req.body.idPublisher);
  res.redirect('/publishers');
});

module.exports = router;
