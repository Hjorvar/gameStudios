CREATE TABLE studios (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  staffAmmount INT,
  city TEXT,
  country TEXT,
  founded INT
);

DROP TABLE studios;

SELECT * FROM studios;

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

INSERT INTO games 
(name, estReleaseYear, idStudio, info, youtubeTrailer)
VALUES
("Grounded", 2022, 15, 
"Grounded is a survival game developed by Obsidian Entertainment and published by Xbox Game Studios. It was released for Windows and Xbox One in early access on July 28, 2020, with the full release expected in 2021. An enhanced version for the Xbox Series X/S was released on November 10, 2020. In the game, players are shrunk to the size of an ant and attempt to survive in a backyard filled with dangers.", 
'<iframe width="560" height="315" src="https://www.youtube.com/embed/S7XDCvpIqoo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');

CREATE TABLE gameGenres (
	idGame INTEGER,
	idGenre INTEGER,
	PRIMARY KEY(idGame, idGenre),
	FOREIGN KEY (idGame) REFERENCES games(id),
	FOREIGN KEY (idGenre) REFERENCES genres(id)
);

INSERT INTO genres (name) VALUES ("Racing");

INSERT INTO gameGenres (idGame, idGenre)
VALUES (4, 	7);

SELECT *
FROM games INNER JOIN gameGenres ON games.id = gameGenres.idGame
INNER JOIN studios ON games.idStudio = studios.id
ORDER BY games.name;