const express = require('express');
const path = require('path');

const router = express.Router();

// get studioTemplate page
router.get('/', (req, res) => {
  res.render('createUpdate/genres', { title: 'Delete', action: 'delete' });
});

router.post('/', (req, res) => {

});

module.exports = router;
