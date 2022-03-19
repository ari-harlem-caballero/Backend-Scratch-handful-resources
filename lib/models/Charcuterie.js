// pool, utils
const pool = require('../utils/pool');


//module.exp === class Charc (id; quote; etc;)
module.exports = class Charcuterie {
  id;
  ingredient;
  category;
  cold;
  //constructor(row) this. row.
  constructor(row) {
    this.id = row.id;
    this.ingredient = row.ingredient;
    this.category = row.category;
    this.cold = row.cold;
  }

  //insert (all params, Ins(ea param)/Val($1)/Ret)
  static async insert({
    ingredient,
    category,
    cold
  }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        charcuteries (ingredient, category, cold)
      VALUES
        ($1, $2, $3)
      RETURNING
        *
      `,
      [ingredient, category, cold]
    );

    return new Charcuterie(rows[0]);
  }

  //getAll (Sel/From, return map)
  static async getAllCharcs() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        charcuteries
      `,
    );

    return rows.map((row) => new Charcuterie(row));
  }

  //getID (Sel/Fr/Wh)
  static async getCharcById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        charcuteries
      WHERE
        id=$1
      `,
      [id]
    );

    return new Charcuterie(rows[0]);
  }
  //update (id/attributes)
    // current (await Charc(id))
    // update (spread curr, spread att)
    // const {att} = update
    // Update, Set(att=$1), Wh(id), Ret
    // if !rows, return
  //delete(id) (Del from, wh, ret)
};
