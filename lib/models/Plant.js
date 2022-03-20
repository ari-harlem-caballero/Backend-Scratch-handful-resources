// pool, utils
const pool = require('../utils/pool');

//module.ex === class Charc (id; quote; etc;)
module.exports = class Plant {
  id;
  name;
  scientificName;
  water;
  sun;
  humidity;
  soilType;

  //constructor(row) this. row. ;
  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.scientificName = row.scientific_name;
    this.water = row.water;
    this.sun = row.sun;
    this.humidity = row.humidity;
    this.soilType = row.soil_type;
  }

  //insert (all params, Ins(ea param)/Val($1)/Ret)
  static async insert({
    name,
    scientificName,
    water,
    sun,
    humidity,
    soilType
  }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        plants (name, scientific_name, water, sun, humidity, soil_type)
      VALUES
        ($1, $2, $3, $4, $5, $6)
      RETURNING
        *
      `,
      [name, scientificName, water, sun, humidity, soilType]
    );

    return new Plant(rows[0]);
  }

  //getAll (Sel/From, return map)
  static async getAllPlants() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        plants
      `,
    );

    return rows.map((row) => new Plant(row));
  }
  //getID (Sel/Fr/Wh)
  //update (id/attributes)
    // current (await Charc(id))
    // update (spread curr, spread att)
    // const {att} = update
    // Update, Set(att=$1), Wh(id), Ret
    // if !rows, return
  //delete(id) (Del from, wh, ret)
};
