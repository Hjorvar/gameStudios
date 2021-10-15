const Database = require('better-sqlite3');

module.exports = function deleteGame(dbFile, idGame) {
  const db = new Database(dbFile);
  const stmt = db.prepare('DELETE FROM games WHERE id = ?');
  stmt.run(idGame);
  db.close();
};
