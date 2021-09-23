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
VALUES (1,2),(2,1),(3,1),(4,1),(5,1),(6,2),(7,1);

INSERT INTO platforms (name)
VALUES ('Xbox Series'), ('Playstation 4'), ('Switch'), ('Xbox One'), ('Playstation 5');

INSERT INTO gamePlatforms
VALUES (1,1), (2,1), (2,4), (3,1), (4,1), (4,4), (5,1), (5,4),(6,1),(7,1);

INSERT INTO games 
(name, estReleaseYear, idStudio, info, youtubeTrailer)
VALUES
("Fable", 2024, 16, 
"Fable is a role-playing video game where players control their character from a third-person perspective. The main character, known as The Hero of Oakvale, can interact with people and objects as well as battle foes. The goal of Fable is to complete missions called quests that advance the game's plot, but Fable also features optional quests and allows players to pursue actions not directly tied to story completion.", 
'<iframe width="560" height="315" src="https://www.youtube.com/embed/A4XgptlqDP4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');



INSERT INTO genres (name) VALUES ("Racing");

INSERT INTO gameGenres (idGame, idGenre)
VALUES (7, 	1), (7, 14);

DELETE FROM games WHERE id = 6;

SELECT *
FROM games INNER JOIN gameGenres ON games.id = gameGenres.idGame
INNER JOIN studios ON games.idStudio = studios.id
ORDER BY games.name;