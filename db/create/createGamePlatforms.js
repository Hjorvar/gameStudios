const Database = require('better-sqlite3');

module.exports = function createGamePlatforms(dbFile, idGame, idPlatform) {
  const db = new Database(dbFile);
  const stmt = db.prepare('INSERT INTO gamePlatforms(idGame, idPlatform) VALUES (?, ?)');
  stmt.run(idGame, idPlatform);
  db.close();
};
