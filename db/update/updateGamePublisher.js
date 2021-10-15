const Database = require('better-sqlite3');

module.exports = function updateGamePublisher(dbFile, idGame, idPublisher) {
  const db = new Database(dbFile);
  const stmt = db.prepare('UPDATE gamePublishers SET idPublisher = ?  WHERE idGame = ?');
  stmt.run(idPublisher, idGame);
  db.close();
};
