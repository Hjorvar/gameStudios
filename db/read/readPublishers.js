const Database = require('better-sqlite3');

module.exports = function readPublishers(dbFile) {
  const db = new Database(dbFile, { verbose: console.log });
  const stmt = db.prepare('SELECT id, name FROM publishers ORDER BY name');
  const publishers = stmt.all();
  db.close();
  return publishers
}



