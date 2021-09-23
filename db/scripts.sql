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
("Halo: Infinite", 2021, 1, 
"Halo Infinite is an upcoming first-person shooter game developed by 343 Industries and published by Xbox Game Studios for Microsoft Windows, Xbox One, and Xbox Series X and Series S. The sixth main entry of the Halo series and the sixteenth Halo game overall, it continues the story of the Master Chief, following Halo 5: Guardians (2015). Unlike previous installments in the series, the multiplayer portion of the game will be free-to-play.", 
'<iframe width="560" height="315" src="https://www.youtube.com/embed/W18OP8BZc6I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');

CREATE TABLE gameGenres (
	idGame INTEGER,
	idGenre INTEGER,
	PRIMARY KEY(idGame, idGenre),
	FOREIGN KEY (idGame) REFERENCES games(id),
	FOREIGN KEY (idGenre) REFERENCES genres(id)
);

INSERT INTO genres (name) VALUES ("First-person");

INSERT INTO gameGenres (idGame, idGenre)
VALUES (2, 	13), (2, 3);

SELECT *
FROM games INNER JOIN gameGenres ON games.id = gameGenres.idGame
INNER JOIN studios ON games.idStudio = studios.id
ORDER BY games.name;