// pool, utils
const pool = require('../utils/pool');

//class Bob (id, quote, etc)
module.exports = class Bob {
  id;
  quote;
  character;
  season;
  episode;

  //constructor(row) this. row.
  constructor(row) {
    this.id = row.id;
    this.quote = row.quote;
    this.character = row.character;
    this.season = row.season;
    this.episode = row.episode;
  }
  //insert (all params, Ins/Val/Ret)
  static async insert({
    quote,
    character,
    season,
    episode,
  }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        bobs (quote, character, season, episode)
      VALUES
        ($1, $2, $3, $4)
      RETURNING
        *
      `,
      [quote, character, season, episode]
    );
    
    return new Bob(rows[0]);
  }
  //getAll (Sel/From, return map)
  static async getAllBobQuotes() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        bobs
      `,
    );

    return rows.map((row) => new Bob(row));
  }
  //getID (Sel/Fr/Wh)
  static async getBobQuoteById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        bobs
      WHERE
        id=$1
      `,
      [id]
    );

    return new Bob(rows[0]);
  }
  //update (id/attributes)
  static async updateBobQuote(id, attributes) {
    // current (await Bob(id))
    const currentQuote = await Bob.getBobQuoteById(id);
    // update (spread curr, spread att)
    const updatedQuote = { ...currentQuote, ...attributes };
    // const {att} = update
    const { quote, character, season, episode } = updatedQuote;
    // Update, Set(att=$1), Wh(id), Ret
    const { rows } = await pool.query(
      `
      UPDATE
        bobs
      SET
        quote=$1,
        character=$2,
        season=$3,
        episode=$4
      WHERE
        id=$5
      RETURNING
        *
      `,
      [quote, character, season, episode, id]
    );
    // if !rows, return
    if (!rows[0]) return null;
    return new Bob(rows[0]);
  }
  
    //delete(id) (Del from, wh, ret)
};

