const Database = require('better-sqlite3');

module.exports = function deleteGenre(dbFile, idGenre) {
	const db = new Database(dbFile);
  const stmt = db.prepare('DELETE FROM genres WHERE id = ?');
  const genre = stmt.run(idGenre);
  console.log(genre.changes);
  db.close();
  return
}