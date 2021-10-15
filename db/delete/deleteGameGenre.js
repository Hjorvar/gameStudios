const Database = require('better-sqlite3');

module.exports = function deleteGameGenre(dbFile, idGame) {
  const db = new Database(dbFile);
  const stmt = db.prepare('DELETE FROM gameGenres WHERE idGame = ?');
  stmt.run(idGame);
  db.close();
};
