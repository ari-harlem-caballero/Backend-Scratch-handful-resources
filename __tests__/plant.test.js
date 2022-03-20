const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Plant = require('../lib/models/Plant');
const { getAllPlants } = require('../lib/models/Plant');

describe('alchemy-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  // create (ex:new, res:post(link)/send(ex), toEq:id/string, sprEx)
  it('should create new row in plant table', async () => {
    const expected = 
    {
      name: 'Moon Valley Pilea',
      scientificName: 'Pilea mollis',
      water: '1-2 per week',
      sun: 'bright indirect',
      humidity: 'room-level',
      soilType: 'peat moss'
    };

    const res = await request(app)
      .post('/api/v1/plants')
      .send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  // getAll (res:get)
  it('should get all rows in plants table', async () => {
    const expected = await Plant.getAllPlants();

    const res = await request(app)
      .get('/api/v1/plants');

    expect(res.body).toEqual(expected);
  });

  // getSingle(id) (id:1, res:get/exID, ret:sprEx)
  it('should get a single row in plants table', async () => {
    const expected = await Plant.getPlantById(1);

    const res = await request(app)
      .get(`/api/v1/plants/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });

  // patch(update) (const:insert, res:patch(link/id)/send(new), ex:id/string)
  it('should update single row in plant table', async () => {
    const newPlant = await Plant.insert({ 
      name: 'Moon Valley Pilea',
      scientificName: 'Pilea mollis',
      water: '1-2 per week',
      sun: 'bright',
      humidity: 'room-level',
      soilType: 'peat moss' });

    const res = await request(app)
      .patch(`/api/v1/plants/${newPlant.id}`)
      .send({ sun: 'bright indirect' });

    const expected = {
      id: expect.any(String),
      name: 'Moon Valley Pilea',
      scientificName: 'Pilea mollis',
      water: '1-2 per week',
      sun: 'bright indirect',
      humidity: 'room-level',
      soilType: 'peat moss'
    };

    // **patch return (await getId(const.id) toEq)
    expect(res.body).toEqual(expected);
    expect(await Plant.getPlantById(newPlant.id)).toEqual(expected);
  });

  // delete (const:insert, res:delete(link/id), const:ALL)
  it('should delete a single row in plants table', async () => {
    const newPlant = await Plant.insert({
      name: 'Moon Valley Pilea',
      scientificName: 'Pilea mollis',
      water: '1-2 per week',
      sun: 'bright indirect',
      humidity: 'room-level',
      soilType: 'peat moss'
    });

    const res = await request(app)
      .delete(`/api/v1/plants/${newPlant.id}`);

    const plantList = await getAllPlants();

    // **del ret (ex:All.not.toContain(res.body))
    expect(plantList).not.toContain(res.body);
  });

});
