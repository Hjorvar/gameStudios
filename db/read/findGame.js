const Database = require('better-sqlite3');

module.exports = function findGame(dbFile, idGame) {
  const db = new Database(dbFile);
  const stmt = db.prepare('SELECT * FROM games INNER JOIN gamePublishers ON games.id = gamePublishers.idGame WHERE games.id = ?');
  const games = stmt.get(idGame);
  db.close();
  return games;
};
