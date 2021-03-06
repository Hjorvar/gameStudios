const express = require('express');
const path = require('path');
const session = require('express-session');
require('colors');
const frontPage = require('./routes');

const createGame = require('./routes/create/game');
const createGenre = require('./routes/create/genre');
const createPlatform = require('./routes/create/platform');
const createStudio = require('./routes/create/studio');

const updateGame = require('./routes/update/game');
const updateGenre = require('./routes/update/genre');
const updateStudio = require('./routes/update/studio');

const deleteGame = require('./routes/delete/game');
const deleteGenre = require('./routes/delete/genre');
const deletePublisher = require('./routes/delete/publisher');
const ds = require('./routes/delete/studio');

const login = require('./routes/login');
const logout = require('./routes/logout');

const readGame = require('./routes/read/game');
const readGames = require('./routes/read/games');
const readStudios = require('./routes/read/studios');
const readPublishers = require('./routes/read/publishers');

const app = express();

// for body parser, leyfir req.body
app.use(express.urlencoded({ extended: false }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

// routers
app.use('/', frontPage);
app.use('/createGame', createGame);
app.use('/createGenre', createGenre);
app.use('/createPlatform', createPlatform);
app.use('/createStudio', createStudio);

app.use('/deleteGame', deleteGame);
app.use('/deleteGenre', deleteGenre);
app.use('/deletePublisher', deletePublisher);
app.use('/ds', ds);

app.use('/updateGame', updateGame);
app.use('/updateGenre', updateGenre);
app.use('/updateStudio', updateStudio);

app.use('/login', login);
app.use('/logout', logout);

app.use('/game', readGame);
app.use('/games', readGames);
app.use('/studios', readStudios);
app.use('/publishers', readPublishers);

// errors : page not found
app.use((req, res) => {
  res.status(404);
  res.render('error', { title: 'Error', status: 404, msg: 'S????a fannst ekki!' });
});

// handling errors
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', { title: 'Error', status: res.status || 500, msg: 'Villa kom upp!' });
});

// setting up the server
app.listen(3000, () => {
  console.log('Server is running on port 3000.....'.green);
});
