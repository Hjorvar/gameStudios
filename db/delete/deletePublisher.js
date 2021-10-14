const Database = require('better-sqlite3');

module.exports = function deleteGenre(dbFile, idPublisher) {
	const db = new Database(dbFile);
  const stmt = db.prepare('DELETE FROM publishers WHERE id = ?');
  const publisher = stmt.run(idPublisher);
  console.log(publisher.changes);
  db.close();
  return
}