CREATE TABLE studios (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  staffAmmount INT,
  city TEXT,
  country TEXT,
  founded INT
);

CREATE TABLE genres (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE games (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	estReleaseYear INTEGER,
	confirmedReleaseDate INTEGER DEFAULT "None",
	idStudio INTEGER,
	info TEXT,
	youtubeTrailer TEXT
);

CREATE TABLE gameGenres (
	idGame INTEGER,
	idGenre INTEGER,
	PRIMARY KEY(idGame, idGenre),
	FOREIGN KEY (idGame) REFERENCES games(id),
	FOREIGN KEY (idGenre) REFERENCES genres(id)
);

CREATE TABLE platforms (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE publishers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE gamePlatforms (
	idGame INTEGER,
	idPlatform INTEGER,
	PRIMARY KEY(idGame, idPlatform),
	FOREIGN KEY (idGame) REFERENCES games(id),
	FOREIGN KEY (idPlatform) REFERENCES platforms(id)
);

CREATE TABLE gamePublishers (
	idGame INTEGER,
	idPublisher INTEGER,
	PRIMARY KEY(idGame, idPublisher),
	FOREIGN KEY (idGame) REFERENCES games(id),
	FOREIGN KEY (idPublisher) REFERENCES publishers(id)
);

DROP TABLE studios;

SELECT * FROM studios;

INSERT INTO publishers (name)
VALUES ('Bandai Namco');

INSERT INTO gamePublishers
VALUES (10,1);

INSERT INTO platforms (name)
VALUES ('Unkown');

INSERT INTO gamePlatforms
VALUES (28, 1), (28, 2), (28, 4), (28, 5), (28, 6)
DELETE FROM games WHERE id = 30;

INSERT INTO games 
(name, estReleaseYear, idStudio, info, youtubeTrailer)
VALUES
("Contraband", 2023, 25, 
"Contraband is an upcoming co-operative multiplayer game being developed by Avalanche Studios for the Xbox Series X|S and Windows PCs. The game is described as being a co-op smuggler’s paradise set in the fictional world of 1970s Bayan and will be the studio's most ambitious and spectacular game to date.
The game is being built upon the he next generation of the Apex Engine, the same technology behind the Just Cause series.", 
'<iframe width="560" height="315" src="https://www.youtube.com/embed/reuri4lT7jI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');

INSERT INTO studios (name)
VALUES ('Avalanche Studios');

DELETE FROM studios WHERE id = 25 OR id = 26;

INSERT INTO genres (name) VALUES ("Open-world");

INSERT INTO gameGenres (idGame, idGenre)
VALUES (28, 	10);

DELETE FROM games WHERE id = 6;

SELECT *
FROM games INNER JOIN gameGenres ON games.id = gameGenres.idGame
INNER JOIN studios ON games.idStudio = studios.id
ORDER BY games.name;

SELECT games.id ,games.name AS name, studios.name AS studioName, GROUP_CONCAT(genres.name) AS genresName FROM games INNER JOIN gameGenres ON games.id = gameGenres.idGame INNER JOIN studios ON games.idStudio = studios.id INNER JOIN genres ON gameGenres.idGenre = genres.id WHERE 1 = 1 GROUP BY games.id  ORDER BY games.name;

CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  username TEXT NOT NULL  UNIQUE,
  password TEXT NOT NULL
  );

INSERT INTO users (username, password)
VALUES ('Hjorvar', 'kennari'), ('Ingvar', 'oli'), ('Brynjar', 'yngstur') ;

INSERT INTO users (username, password)
VALUES ('Bjarni', 'gamli');

SELECT username FROM users WHERE username = 'Hjorvar' AND password = 'kennari';

DELETE FROM games WHERE id = 11;

SELECT games.id, games.name AS name, studios.name AS studioName, GROUP_CONCAT(genres.name) AS genresName 
FROM games INNER JOIN gameGenres ON games.id = gameGenres.idGame 
INNER JOIN studios ON games.idStudio = studios.id 
INNER JOIN genres ON gameGenres.idGenre = genres.id 
INNER JOIN gamePlatforms ON games.id = gamePlatforms.idGame 
INNER JOIN platforms ON gamePlatforms.idPlatform = platforms.id 
WHERE 1 = 1 
GROUP BY games.id 
ORDER BY games.name;


SELECT DISTINCT games.id, games.name AS name, studios.name AS studioName, GROUP_CONCAT(genres.name) AS genresName 
FROM games INNER JOIN gameGenres ON games.id = gameGenres.idGame 
INNER JOIN studios ON games.idStudio = studios.id 
INNER JOIN genres ON gameGenres.idGenre = genres.id
INNER JOIN gamePlatforms ON games.id = gamePlatforms.idGame 
INNER JOIN platforms ON gamePlatforms.idPlatform = platforms.id 
WHERE 1 = 1 AND games.id = 11 
GROUP BY games.id, gamePlatforms.idPlatform 
ORDER BY games.name;


UPDATE games SET idStudio = 25 WHERE id = 10; 

DELETE FROM gamePublishers WHERE idGame = 13;


SELECT studios.id AS id, studios.name AS name, 
studios.country AS country, studios.city AS city, 
studios.staffAmmount AS staffAmmount,
COUNT(games.id) AS games 
FROM studios LEFT OUTER JOIN games
ON studios.id = games.idStudio
GROUP BY
studios.id
ORDER BY name;



SELECT id, name, COUNT(*) AS games FROM publishers INNER JOIN gamePublishers ON publishers.id = gamePublishers.idPublisher GROUP BY publishers.id ORDER BY name;

ALTER TABLE games ADD COLUMN thumbnail NOT NULL DEFAULT 'NONE';

ALTER TABLE games ADD COLUMN mobileBackground NOT NULL DEFAULT 'NONE';
ALTER TABLE games ADD COLUMN opinCritic NOT NULL DEFAULT 'NONE';

ALTER TABLE games
RENAME COLUMN opinCritic TO openCritic;

UPDATE games SET background = "haloInfiniteBackground.jpg" WHERE id = 2;
UPDATE games SET mobileBackground = "haloInfiniteMobile.jpg" WHERE id = 2;

SELECT * FROM games WHERE background = 'NONE';

UPDATE games SET openCritic = '<iframe src="https://opencritic.com/game/1572/score?theme=light" frameborder="0" height="102"></iframe>' WHERE id = 24;

SELECT * FROM publishers;

SELECT id, name, COUNT(*) AS games FROM publishers INNER JOIN gamePublishers ON publishers.id = gamePublishers.idPublisher GROUP BY publishers.id ORDER BY name;

SELECT id, name, COUNT(*) AS games FROM publishers LEFT OUTER JOIN gamePublishers ON publishers.id = gamePublishers.idPublisher GROUP BY publishers.id ORDER BY name;