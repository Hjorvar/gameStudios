const Database = require('better-sqlite3');

module.exports = function createGame(dbFile, name, idStudio, info, trailer, year, month) {
  const db = new Database(dbFile);
  const stmt = db.prepare('INSERT INTO games(name, idStudio, info, youtubeTrailer, year, month) VALUES (?, ?, ?, ?, ?, ?)');
  const genre = stmt.run(name, idStudio, info, trailer, year, month);
  const lastId = genre.lastInsertRowid;
  db.close();
  return lastId
}