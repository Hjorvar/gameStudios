const Database = require('better-sqlite3');

module.exports = function updateGame(dbFile, id, name, info, trailer,
  year, month, idStudio, opencritic) {
  const db = new Database(dbFile);
  const stmt = db.prepare('UPDATE games SET name = ?, info = ?, youtubeTrailer = ?, year = ?, month = ?, idStudio = ?, openCritic = ?  WHERE id = ?');
  stmt.run(name, info, trailer, year, month, idStudio, opencritic, id);
  db.close();
};
