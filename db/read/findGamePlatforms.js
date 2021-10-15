const Database = require('better-sqlite3');

module.exports = function findGamePlatforms(dbFile, idGame) {
  const db = new Database(dbFile);
  const stmt = db.prepare('SELECT idPlatform FROM gamePlatforms WHERE idGame = ?');
  const gamePlatforms = stmt.all(idGame);
  db.close();
  return gamePlatforms;
};
