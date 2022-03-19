// pool, utils
const res = require('express/lib/response');
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
  static async updateCharc(id, attributes) {

    // current (await Charc(id))
    const currentCharc = await Charcuterie.getCharcById(id);

    // update (spread curr, spread att)
    const updatedCharc = { ...currentCharc, ...attributes };

    // const {att} = update
    const { ingredient, category, cold } = updatedCharc;

    // Update, Set(att=$1), Wh(id), Ret
    const { rows } = await pool.query(
      `
      UPDATE
        charcuteries
      SET
        ingredient=$1,
        category=$2,
        cold=$3
      WHERE
        id=$4
      RETURNING
        *
      `,
      [ingredient, category, cold, id]
    );
    // if !rows, return
    if (!rows[0]) return null;
    return new Charcuterie(rows[0]);
  }

  //delete(id) (Del from, wh, ret)
  static async deleteCharc(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        charcuteries
      WHERE
        id=$1
      RETURNING
        *
      `,
    );
    
    return new Charcuterie(rows[0]);
  }
};
