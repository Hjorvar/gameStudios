const Database = require('better-sqlite3');

module.exports = function deleteGamePublisher(dbFile, idPublisher) {
  const db = new Database(dbFile);
  const stmt = db.prepare('DELETE FROM gamePublishers WHERE idPublisher = ?');
  const gamePublisher = stmt.run(idPublisher);
  console.log(gamePublisher.changes);
  db.close();
  return
}