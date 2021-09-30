const Database = require('better-sqlite3');

module.exports = function createPlatform(dbFile, name) {
  const db = new Database(dbFile, { verbose: console.log });
  const stmt = db.prepare('INSERT INTO platforms(name) VALUES (?)');
  const platform = stmt.run(name);
  console.log(platform.changes);
  db.close();
  return
}
