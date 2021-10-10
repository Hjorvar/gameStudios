const Database = require('better-sqlite3');

module.exports = function createStudio(dbFile, name, city, country, staff, founded, firstPartyOwner) {
  const db = new Database(dbFile);
  const stmt = db.prepare('INSERT INTO studios(name, city, country, staffAmmount, founded, firstPartyOwner) VALUES (?, ?, ?, ?, ?, ?)');
  const studio = stmt.run(name, city, country, staff, founded, firstPartyOwner);
  db.close();
  return
}
