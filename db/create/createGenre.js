const Database = require('better-sqlite3');

module.exports = function createGenre(dbFile, name) {
  const db = new Database(dbFile);
  const stmt = db.prepare('INSERT INTO genres(name) VALUES (?)');
  stmt.run(name);
  db.close();
};
