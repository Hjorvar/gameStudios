const express = require('express');
const Worker = require('../db/Worker');
const path = require('path');

const db = new Worker(path.join(__dirname, '../db/gameStudios.db'));

const router = express.Router();

// get index page
router.get('/', (req, res) => {
  
  (async function main() {
    const readStudios = await Promise.all([
      db.readStudios()
    ]);
    await console.log(readStudios);
  })();
  // console.log(db.readStudios());


  res.render('index', { title: 'Front page' });
});

module.exports = router;
