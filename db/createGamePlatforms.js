const Database = require('better-sqlite3');

module.exports = function createGamePlatforms(dbFile, idGame, idPlatform) {
  const db = new Database(dbFile, { verbose: console.log });
  const stmt = db.prepare('INSERT INTO gamePlatforms(idGame, idPlatform) VALUES (?, ?)');
  const gamePlatform = stmt.run(idGame, idPlatform);
  console.log(gamePlatform.changes);
  db.close();
  return
}