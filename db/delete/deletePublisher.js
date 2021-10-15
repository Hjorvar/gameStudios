const Database = require('better-sqlite3');

module.exports = function deleteGenre(dbFile, idPublisher) {
  const db = new Database(dbFile);
  const stmt = db.prepare('DELETE FROM publishers WHERE id = ?');
  stmt.run(idPublisher);
  db.close();
};
