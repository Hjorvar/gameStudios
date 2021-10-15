const Database = require('better-sqlite3');

module.exports = function findGameGenre(dbFile, idGame) {
  const db = new Database(dbFile);
  const stmt = db.prepare('SELECT idGenre FROM gameGenres WHERE idGame = ?');
  const gameGenre = stmt.all(idGame);
  db.close();
  return gameGenre;
};
