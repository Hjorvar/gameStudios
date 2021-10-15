const Database = require('better-sqlite3');

module.exports = function deleteGamePublisher(dbFile, idGame) {
  const db = new Database(dbFile);
  const stmt = db.prepare('DELETE FROM gamePublishers WHERE idGame = ?');
  stmt.run(idGame);
  db.close();
};
