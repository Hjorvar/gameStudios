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

