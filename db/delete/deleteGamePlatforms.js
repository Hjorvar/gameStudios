const Database = require('better-sqlite3');

module.exports = function deleteGamePlatforms(dbFile, idGame) {
  const db = new Database(dbFile, { verbose: console.log });
  const stmt = db.prepare('DELETE FROM gamePlatforms WHERE idGame = ?');
  const gamePlatforms = stmt.run(idGame);
  console.log(gamePlatforms.changes);
  db.close();
  return
}