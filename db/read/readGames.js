const Database = require('better-sqlite3');

module.exports = function readGames(dbFile, where, search) {
  const db = new Database(dbFile);
  const stmt = db.prepare(`
    SELECT DISTINCT games.id, games.name AS name, studios.name AS studioName, 
    GROUP_CONCAT(genres.name) AS genresName 
    FROM games INNER JOIN gameGenres ON games.id = gameGenres.idGame 
    INNER JOIN studios ON games.idStudio = studios.id 
    INNER JOIN genres ON gameGenres.idGenre = genres.id
    INNER JOIN gamePlatforms ON games.id = gamePlatforms.idGame 
    INNER JOIN platforms ON gamePlatforms.idPlatform = platforms.id 
    ${where}
    GROUP BY games.id, gamePlatforms.idPlatform 
    ORDER BY games.year, games.month, games.name;`);
  const games = stmt.all(search);
  db.close();
  return games
}
