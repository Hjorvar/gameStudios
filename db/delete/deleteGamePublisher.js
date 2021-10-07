const Database = require('better-sqlite3');

module.exports = function deleteGamePublisher(dbFile, idGame) {
  const db = new Database(dbFile);
  const stmt = db.prepare('DELETE FROM gamePublishers WHERE idGame = ?');
  const gamePublisher = stmt.run(idGame);
  console.log(gamePublisher.changes);
  db.close();
  return
}