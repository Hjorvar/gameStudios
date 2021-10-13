const Database = require('better-sqlite3');

module.exports = function createGame(dbFile, name, idStudio, info, trailer, year, month, opencritic) {
  const db = new Database(dbFile, { verbose: console.log });
  const stmt = db.prepare('INSERT INTO games(name, idStudio, info, youtubeTrailer, year, month, openCritic) VALUES (?, ?, ?, ?, ?, ?, ?)');
  const genre = stmt.run(name, idStudio, info, trailer, year, month, openCritic);
  const lastId = genre.lastInsertRowid;
  db.close();
  return lastId
}