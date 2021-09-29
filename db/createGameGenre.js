const Database = require('better-sqlite3');

module.exports = function createGameGenre(dbFile, idGame, idGenre) {
  const db = new Database(dbFile, { verbose: console.log });
  const stmt = db.prepare('INSERT INTO gameGenres(idGame, idGenre) VALUES (?, ?)');
  const gameGenre = stmt.run(idGame, idGenre);
  console.log(gameGenre.changes);
  db.close();
  return
}