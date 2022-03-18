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
  //getID (Sel/Fr/Wh)
  //update (id/attributes)
    // current (await Bob(id))
    // update (spread curr, spread att)
    // const {att} = update
    // Update, Set(att=$1), Wh(id), Ret
    // if !rows, return
    //delete(id) (Del from, wh, ret)
};

