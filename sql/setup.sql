-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS bobs;
DROP TABLE IF EXISTS charcuteries;
DROP TABLE IF EXISTS plants;
DROP TABLE IF EXISTS tvshows;

CREATE TABLE songs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  album TEXT
);

CREATE TABLE bobs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  quote TEXT NOT NULL,
  character TEXT NOT NULL,
  season INT NOT NULL,
  episode INT NOT NULL
);

CREATE TABLE charcuteries (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ingredient TEXT NOT NULL,
  category TEXT NOT NULL,
  cold BOOLEAN NOT NULL
);

CREATE TABLE plants (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  scientific_name TEXT NOT NULL,
  water TEXT NOT NULL,
  sun TEXT NOT NULL,
  humidity TEXT NOT NULL,
  soil_type TEXT NOT NULL
);

CREATE TABLE tvshows (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  genre TEXT [] NOT NULL,
  seasons INT NOT NULL,
  episodes INT,
  run_time INT,
  active BOOLEAN
);

INSERT INTO
  songs(title, artist, album)
VALUES
  ('Honey Whiskey', 'SATICA', 'Honey Whiskey'),
  ('Industry Baby', 'Lil Nas X', 'Montero'),
  ('Bad Stuff Happens in the Bathroom', 'Bob''s Burgers', 'The Bob''s Burgers Music Album');

INSERT INTO
  bobs(quote, character, season, episode)
VALUES
  ('Wine helps me drink.', 'Linda Belcher', 4, 1),
  ('You''ll take the butts you''re given, and you''ll like it!', 'Gene Blecher', 4, 13),
  ('You''re a hurtful slut, Bob!', 'Linda Belcher', 2, 6),
  ('I am powerful forces.', 'Tina Belcher', 7, 3);

INSERT INTO
  charcuteries(ingredient, category, cold)
VALUES
  ('date', 'fruit', 'true'),
  ('chocolate', 'sweet', 'false'),
  ('goat cheese', 'cheese', 'true');

INSERT INTO
  plants(name, scientific_name, water, sun, humidity, soil_type)
VALUES
  ('Monstera', 'Monstera deliciosa', 'weekly', 'medium indirect', 'room-level', 'potting'),
  ('Alice Sundew', 'Drosera aliciae', 'daily', 'medium-high', 'medium', 'peat moss, sand'),
  ('Moth Orchid', 'Phalaenopsis', 'weekly', 'bright indirect', 'med-high','peat moss');

INSERT INTO
  tvshows(title, genre, seasons, episodes, run_time, active)
VALUES
  ('Bob''s Burgers', '{Animated, Comedy}', 12, 233, 22, 'true'),
  ('Steven Universe', '{Action, Adventure, Animated, Comedy, Coming-of-age}', 6, 175, 11, 'false'),
  ('The Office', '{Comedy, Mockumentary, Romance}', 9, 188, 22, 'false');