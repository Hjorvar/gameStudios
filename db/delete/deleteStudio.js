const Database = require('better-sqlite3');

module.exports = function deleteGenre(dbFile, idStudio) {
  const db = new Database(dbFile);
  const stmt = db.prepare('DELETE FROM studios WHERE id = ?');
  stmt.run(idStudio);
  db.close();
};
