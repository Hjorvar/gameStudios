const Database = require('better-sqlite3');

module.exports = function createStudio(dbFile, name, city, country, staff, founded) {
  const db = new Database(dbFile);
  const stmt = db.prepare('INSERT INTO studios(name, city, country, staffAmmount, founded) VALUES (?, ?, ?, ?, ?)');
  const studio = stmt.run(name, city, country, staff, founded);
  db.close();
  return
}
