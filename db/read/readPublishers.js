const Database = require('better-sqlite3');

module.exports = function readPublishers(dbFile) {
  const db = new Database(dbFile);
  const stmt = db.prepare('SELECT id, name, COUNT(*) AS games FROM publishers LEFT OUTER JOIN gamePublishers ON publishers.id = gamePublishers.idPublisher GROUP BY publishers.id ORDER BY name;');
  const publishers = stmt.all();
  db.close();
  return publishers;
};
