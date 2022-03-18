-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS bobs;

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
  episode INT NOT NULL,
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