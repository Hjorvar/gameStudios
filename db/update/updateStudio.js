const Database = require('better-sqlite3');

module.exports = function updateStudios(dbFile, id, name, staffAmmount,
  city, country, founded, firstPartyOwner) {
  const db = new Database(dbFile);
  const stmt = db.prepare('UPDATE studios SET name = ?, staffAmmount = ?, city = ?, country = ?, founded = ?, firstPartyOwner = ?  WHERE id = ?');
  stmt.run(name, staffAmmount, city, country, founded, firstPartyOwner, id);
  db.close();
};
