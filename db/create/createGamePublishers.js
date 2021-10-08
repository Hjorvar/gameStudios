const Database = require('better-sqlite3');

module.exports = function createGamePublishers(dbFile, idGame, idPublisher) {
  const db = new Database(dbFile);
  const stmt = db.prepare('INSERT INTO gamePublishers(idGame, idPublisher) VALUES (?, ?)');
  const gamePublisher = stmt.run(idGame, idPublisher);
  db.close();
  return
}