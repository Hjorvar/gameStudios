const Database = require('better-sqlite3');

module.exports = function readStudios(dbFile, user, password) {
  const db = new Database(dbFile, { verbose: console.log });
  const stmt = db.prepare('SELECT username FROM users WHERE username LIKE ? AND password = ?');
  const studios = stmt.get(user, password);
  db.close();
  return studios
}



