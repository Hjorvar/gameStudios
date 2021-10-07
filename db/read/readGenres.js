const Database = require('better-sqlite3');

module.exports = function readGenres(dbFile) {
  const db = new Database(dbFile);
  const stmt = db.prepare('SELECT id, name FROM genres ORDER BY name');
  const genres = stmt.all();
  db.close();
  return genres
}
