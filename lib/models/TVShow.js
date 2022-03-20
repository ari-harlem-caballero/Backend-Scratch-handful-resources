const pool = require('../utils/pool');

module.exports = class TVShow {
  id;
  title;
  genre;
  seasons;
  episodes;
  runTime;
  active;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.genre = row.genre;
    this.seasons = row.seasons;
    this.episodes = row.episodes;
    this.runTime = row.run_time;
    this.active = row.active;
  }

  static async insert({
    title,
    genre,
    seasons,
    episodes,
    runTime,
    active
  }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        tvshows (title, genre, seasons, episodes, run_time, active)
      VALUES
        ($1, $2, $3, $4, $5, $6)
      RETURNING
        *
      `,
      [title, genre, seasons, episodes, runTime, active]
    );

    return new TVShow(rows[0]);
  }
};
