const express = require('express');
const path = require('path');
require('colors');
const frontPage = require('./routes/');

const createGame = require('./routes/create/game');
const createGenre = require('./routes/create/genre');
const createPlatform = require('./routes/create/platform');
const createStudio = require('./routes/create/studio');

const updateGame = require('./routes/update/game');
const updateGenre = require('./routes/update/genre');
const updateStudio = require('./routes/update/studio');

const deleteGame = require('./routes/delete/game');
const deleteGenre = require('./routes/delete/genre');
const ds = require('./routes/delete/studio');

const readGame = require('./routes/read/game');
const readGames = require('./routes/read/games');
const readStudios = require('./routes/read/studios');

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
app.use('/createGame', createGame);
app.use('/createGenre', createGenre);
app.use('/createPlatform', createPlatform);
app.use('/createStudio', createStudio);

app.use('/deleteGame', deleteGame);
app.use('/deleteGenre', deleteGenre);
app.use('/ds', ds);

app.use('/updateGame', updateGame);
app.use('/updateGenre', updateGenre);
app.use('/updateStudio', updateStudio);

app.use('/game', readGame);
app.use('/games', readGames);
app.use('/studios', readStudios);



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