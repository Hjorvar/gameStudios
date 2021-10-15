const express = require('express');
const path = require('path');
const readStudios = require('../../db/read/readStudios');
const dbFile = path.join(__dirname, '../../db/gameStudios.db');
const isLoggedin = require('../../functions/isLoggedin');

const router = express.Router();

// get index page
router.get('/', (req, res) => {
  let username = isLoggedin(req.session);
  let where = 'WHERE 1 = 1';
  let search = [];
  if(req.query.firstPartyOwner){
    if(req.query.firstPartyOwner != 'None'){
      where += ' AND studios.firstPartyOwner = ?';
      search.push(req.query.firstPartyOwner);
    }
  }
  console.log(where);
  console.log(search);
  const studios = readStudios(dbFile, where, search);
  res.render('read/studios', { title: 'Studios', studios, username });

});

module.exports = router;
