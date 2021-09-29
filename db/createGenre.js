const Database = require('better-sqlite3');

module.exports = function createGenre(dbFile, name) {
  const db = new Database(dbFile, { verbose: console.log });
  const stmt = db.prepare('INSERT INTO genres(name) VALUES (?)');
  const studios = stmt.run(name);
  db.close();
  return studios
}
