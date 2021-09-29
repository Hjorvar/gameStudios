const Database = require('better-sqlite3');

module.exports = function readStudios(dbFile) {
  const db = new Database(dbFile, { verbose: console.log });
  const stmt = db.prepare('SELECT id, name, country, city, staffAmmount FROM studios ORDER BY name');
  const studios = stmt.all();
  db.close();
  return studios
}



