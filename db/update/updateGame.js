const Database = require('better-sqlite3');

module.exports = function updateGame(dbFile, id, name, info, trailer, year, month, idStudio) {
  const db = new Database(dbFile, { verbose: console.log });
  const stmt = db.prepare('UPDATE games SET name = ?, info = ?, youtubeTrailer = ?, year = ?, month = ?, idStudio = ?  WHERE id = ?');
  const game = stmt.run(name, info, trailer, year, month, idStudio, id);
  console.log(game.changes);
  db.close();
  return
}
