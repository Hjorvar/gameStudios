const Database = require('better-sqlite3');

module.exports = function deleteGamePlatforms(dbFile, idGame) {
  const db = new Database(dbFile);
  const stmt = db.prepare('DELETE FROM gamePlatforms WHERE idGame = ?');
  stmt.run(idGame);
  db.close();
};
