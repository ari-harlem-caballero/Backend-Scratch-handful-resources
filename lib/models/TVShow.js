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

  static async getAllTVShows() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        tvshows
      `,
    );

    return rows.map((row) => new TVShow(row));
  }

  static async getTVShowById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        tvshows
      WHERE
        id=$1
      `,
      [id]
    );

    return new TVShow(rows[0]);
  }

  static async updateTVShow(id, attributes) {
    const currentShow = await TVShow.getTVShowById(id);

    const updatedShow = { ...currentShow, ...attributes };

    const { title, genre, seasons, episodes, runTime, active } = updatedShow;

    const { rows } = await pool.query(
      `
      UPDATE
        tvshows
      SET
        title=$1,
        genre=$2,
        seasons=$3,
        episodes=$4,
        run_time=$5,
        active=$6
      WHERE
        id=$7
      RETURNING
        *
      `,
      [title, genre, seasons, episodes, runTime, active, id]
    );
    
    if (!rows[0]) return null;
    return new TVShow(rows[0]);
  }
};
