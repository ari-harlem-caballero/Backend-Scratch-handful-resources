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
  static async getPlantById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        plants
      WHERE
        id=$1
      `,
      [id]
    );

    return new Plant(rows[0]);
  }

  //update (id/attributes)
  static async updatePlantById(id, attributes) {
    // current (await Charc(id))
    const currentPlant = await Plant.getPlantById(id);

    // update (spread curr, spread att)
    const updatedPlant = { ...currentPlant, ...attributes };

    // const {att} = update
    const { name, scientificName, water, sun, humidity, soilType } = updatedPlant;

    // Update, Set(att=$1), Wh(id), Ret
    const { rows } = await pool.query(
      `
      UPDATE
        plants
      SET
        name=$1,
        scientific_name=$2,
        water=$3,
        sun=$4,
        humidity=$5,
        soil_type=$6
      WHERE
        id=$7
      RETURNING
        *
      `,
      [name, scientificName, water, sun, humidity, soilType, id]
    );
    // if !rows, return
    console.log('!!!!!!!!!!!', rows[0]);
    if (!rows[0]) return null;
    return new Plant(rows[0]);
  }
  //delete(id) (Del from, wh, ret)
};
