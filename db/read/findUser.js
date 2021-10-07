const Database = require('better-sqlite3');

module.exports = function readStudios(dbFile, user, password) {
  const db = new Database(dbFile);
  const stmt = db.prepare('SELECT username FROM users WHERE username = ? COLLATE NOCASE AND password = ?');
  const studios = stmt.get(user, password);
  db.close();
  return studios
}



