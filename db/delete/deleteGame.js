const Database = require('better-sqlite3');

module.exports = function deleteGame(dbFile, idGame) {
  const db = new Database(dbFile);
  const stmt = db.prepare('DELETE FROM games WHERE id = ?');
  const games = stmt.run(idGame);
  console.log(games.changes);
  db.close();
  return
}