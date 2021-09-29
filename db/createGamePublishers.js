const Database = require('better-sqlite3');

module.exports = function createGamePublishers(dbFile, idGame, idPublisher) {
  const db = new Database(dbFile, { verbose: console.log });
  const stmt = db.prepare('INSERT INTO gamePublishers(idGame, idPublisher) VALUES (?, ?)');
  const gamePublisher = stmt.run(idGame, idPublisher);
  console.log(gamePublisher.changes);
  db.close();
  return
}