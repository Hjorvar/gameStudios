const Database = require('better-sqlite3');

module.exports = function updateStudios(dbFile, id, name, staffAmmount, city, country, founded) {
  const db = new Database(dbFile);
  const stmt = db.prepare('UPDATE studios SET name = ?, staffAmmount = ?, city = ?, country = ?, founded = ?  WHERE id = ?');
  const studios = stmt.run(name, staffAmmount, city, country, founded, id);
  console.log(studios.changes);
  db.close();
  return
}
