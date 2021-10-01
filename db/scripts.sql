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
VALUES ('Xbox Game Studios'), ('Bethesda Softworks'), ('Sony Interactive Entertainment');

INSERT INTO gamePublishers
VALUES (10,1);

INSERT INTO platforms (name)
VALUES ('Unkown');

INSERT INTO gamePlatforms
VALUES (11, 1), (11, 4), (11, 6), (11, 7);

DELETE FROM gamePlatforms WHERE idPlatform = 16;

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

INSERT INTO genres (name) VALUES ("Unkown");

INSERT INTO gameGenres (idGame, idGenre)
VALUES (10, 	1);

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

