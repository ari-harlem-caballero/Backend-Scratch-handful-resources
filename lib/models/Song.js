const pool = require('../utils/pool');

module.exports = class Song {
  id;
  title;
  artist;
  album;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.artist = row.artist;
    this.album = row.album;
  }

  static async insert({ 
    title,
    artist,
    album 
  }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        songs (title, artist, album)
      VALUES
        ($1, $2, $3)
      RETURNING
        *
      `,
      [title, artist, album]
    );

    return new Song(rows[0]);
  }

  static async getAllSongs() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        songs
      `
    );

    return rows.map((row) => new Song(row));
  }

  static async getSongById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        songs
      WHERE
        id=$1
      `,
      [id]
    );

    return new Song(rows[0]);
  }

  static async updateSongById(id, attributes) {
    const currentSong = await Song.getSongById(id);

    const updatedSong = { ...currentSong, ...attributes };

    const { title, artist, album } = updatedSong;

    const { rows } = await pool.query(
      `
      UPDATE
        songs
      SET
        title=$1,
        artist=$2,
        album=$3
      WHERE
        id=$4
      RETURNING
        *
      `,
      [title, artist, album, id]
    );

    if (!rows[0]) return null;
    return new Song(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        songs
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );

    return new Song(rows[0]);
  }

};
