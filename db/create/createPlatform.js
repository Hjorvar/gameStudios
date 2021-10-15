const Database = require('better-sqlite3');

module.exports = function createPlatform(dbFile, name) {
  const db = new Database(dbFile);
  const stmt = db.prepare('INSERT INTO platforms(name) VALUES (?)');
  stmt.run(name);
  db.close();
};
