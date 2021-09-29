const Database = require('better-sqlite3');

module.exports = function readStudios(dbFile, idStudio) {
  const db = new Database(dbFile, { verbose: console.log });
  const stmt = db.prepare('SELECT * FROM studios WHERE id = ?');
  const studios = stmt.get(idStudio);
  db.close();
  return studios
}



