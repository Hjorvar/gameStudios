const Database = require('better-sqlite3');

module.exports = function readPlatforms(dbFile) {
  const db = new Database(dbFile);
  const stmt = db.prepare('SELECT id, name FROM platforms ORDER BY name');
  const platforms = stmt.all();
  db.close();
  return platforms;
};
