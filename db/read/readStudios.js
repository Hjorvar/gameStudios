const Database = require('better-sqlite3');

module.exports = function readStudios(dbFile, where, search) {
  const db = new Database(dbFile);
  const stmt = db.prepare(`
    SELECT studios.id AS id, studios.name AS name, 
    studios.country AS country, studios.city AS city, 
    studios.staffAmmount AS staffAmmount,
    studios.firstPartyOwner AS firstPartyOwner,
    COUNT(games.id) AS games 
    FROM studios LEFT OUTER JOIN games
    ON studios.id = games.idStudio
    ${where}
    GROUP BY
    studios.id
    ORDER BY name;
  `);
  const studios = stmt.all(search);
  db.close();
  return studios;
};
