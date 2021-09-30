const Database = require('better-sqlite3');

module.exports = function readStudios(dbFile, idGame) {
  const db = new Database(dbFile, { verbose: console.log });
  const stmt = db.prepare('SELECT games.id, games.name AS name, studios.name AS studioName, GROUP_CONCAT(genres.name) AS genresName, games.youtubeTrailer AS trailer, games.info AS info FROM games INNER JOIN gameGenres ON games.id = gameGenres.idGame INNER JOIN studios ON games.idStudio = studios.id INNER JOIN genres ON gameGenres.idGenre = genres.id WHERE games.id = ? GROUP BY games.id ORDER BY games.name;');
  const game = stmt.get(idGame);
  db.close();
  return game
}



