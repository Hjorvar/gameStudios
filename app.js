const express = require('express');
const path = require('path');
require('colors');
const frontPage = require('./routes/');
const createStudio = require('./routes/createStudio');
const updateStudio = require('./routes/updateStudio');

const app = express();

// for body parser, leyfir req.body
app.use(express.urlencoded({ extended: false }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routers
app.use('/', frontPage);
app.use('/createStudio', createStudio);
app.use('/updateStudio', updateStudio);


// errors : page not found
app.use((req, res, next) => {
  const err = new Error('Page not found');
  err.status = 404;
  next(err);
});

// handling errors
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.send(err.message);
});

// setting up the server
app.listen(3000, () => {
  console.log('Server is running on port 3000.....'.green);
});