const Database = require('better-sqlite3');

module.exports = function deleteGenre(dbFile, idGenre) {
  const db = new Database(dbFile);
  const stmt = db.prepare('DELETE FROM genres WHERE id = ?');
  stmt.run(idGenre);
  db.close();
};
