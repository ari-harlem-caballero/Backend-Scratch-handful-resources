-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  album TEXT
);

INSERT INTO
  song (title, artist, album)
VALUES
  ('Honey Whiskey', 'SATICA', 'Honey Whiskey'),
  ('Industry Baby', 'Lil Nas X', 'Montero'),
  ('Bad Stuff Happens in the Bathroom', `Bob's Burgers`, `The Bob's Burgers Music Album`);