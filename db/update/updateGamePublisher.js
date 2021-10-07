const Database = require('better-sqlite3');

module.exports = function updateGamePublisher(dbFile, idGame, idPublisher) {
  const db = new Database(dbFile);
  const stmt = db.prepare('UPDATE gamePublishers SET idPublisher = ?  WHERE idGame = ?');
  const gamePublisher = stmt.run(idPublisher, idGame);
  console.log(gamePublisher.changes);
  db.close();
  return
}
