const Database = require('better-sqlite3');

module.exports = function readGames(dbFile, where, search, orderBy) {
  const db = new Database(dbFile);
  const stmt = db.prepare(`
    SELECT DISTINCT games.id, games.name AS name, studios.name AS studioName, 
    gamePublishers.idPublisher AS idPublisher, GROUP_CONCAT(genres.name) AS genresName
    FROM games INNER JOIN gameGenres ON games.id = gameGenres.idGame 
    INNER JOIN studios ON games.idStudio = studios.id 
    INNER JOIN genres ON gameGenres.idGenre = genres.id
    INNER JOIN gamePlatforms ON games.id = gamePlatforms.idGame 
    INNER JOIN platforms ON gamePlatforms.idPlatform = platforms.id 
    INNER JOIN gamePublishers ON games.id = gamePublishers.idGame
    ${where}
    GROUP BY games.id, gamePlatforms.idPlatform 
    ORDER BY ${orderBy};`);
  const games = stmt.all(search);
  db.close();
  return games
}
