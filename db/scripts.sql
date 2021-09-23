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
VALUES (8,3);

INSERT INTO platforms (name)
VALUES ('Xbox Series'), ('Playstation 4'), ('Switch'), ('Xbox One'), ('Playstation 5');

INSERT INTO gamePlatforms
VALUES (8, 2);

INSERT INTO games 
(name, estReleaseYear, idStudio, info, youtubeTrailer)
VALUES
("God of War", 2018, 24, 
"God of War is an action-adventure game developed by Santa Monica Studio and published by Sony Interactive Entertainment (SIE). Released worldwide on April 20, 2018, for the PlayStation 4 (PS4), it is the eighth installment in the God of War series, the eighth chronologically, and the sequel to 2010's God of War III. Unlike previous games, which were loosely based on Greek mythology, this installment is loosely inspired by Norse mythology, with the majority of it set in ancient Scandinavia in the realm of Midgard. ", 
'<iframe width="560" height="315" src="https://www.youtube.com/embed/K0u_kAWLJOA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');

INSERT INTO studios (name)
VALUES ('Santa Monica Studio');

INSERT INTO genres (name) VALUES ("Racing");

INSERT INTO gameGenres (idGame, idGenre)
VALUES (8, 	12);

DELETE FROM games WHERE id = 6;

SELECT *
FROM games INNER JOIN gameGenres ON games.id = gameGenres.idGame
INNER JOIN studios ON games.idStudio = studios.id
ORDER BY games.name;

SELECT games.id ,games.name AS name, studios.name AS studioName, GROUP_CONCAT(genres.name) AS genresName FROM games INNER JOIN gameGenres ON games.id = gameGenres.idGame INNER JOIN studios ON games.idStudio = studios.id INNER JOIN genres ON gameGenres.idGenre = genres.id WHERE 1 = 1 GROUP BY games.id  ORDER BY games.name;