const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Charcuterie = require('../lib/models/Charcuterie');

describe('alchemy-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  // create (ex:new, res:post(link)/send(ex), toEq:id/string, sprEx)
  it('should create new charc row', async () => {
    const expected =
    {
      ingredient: 'toast point',
      category: 'carb',
      cold: true
    };

    const res = await request(app)
      .post('/api/v1/charcuteries')
      .send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  // getAll (res:get)
  it('should get all charc rows', async () => {
    const expected = await Charcuterie.getAllCharcs();

    const res = await request(app)
      .get('/api/v1/charcuteries');

    expect(res.body).toEqual(expected);
  });

  // getSingle(id) (id:1, res:get/exID, ret:sprEx)
  it('should get a single char row based on ID', async () => {
    const expected = await Charcuterie.getCharcById(1);

    const res = await request(app)
      .get(`/api/v1/charcuteries/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });

  // patch(update) (const:insert, res:patch(link/id)/send(new), ex:id/string)
  it('should update single char based on ID', async () => {
    const newCharc = await Charcuterie.insert({ ingredient: 'toast point', category: 'carb', cold: false });

    const res = await request(app)
      .patch(`/api/v1/charcuteries/${newCharc.id}`)
      .send({ cold: true });

    const expected = 
    {
      id: expect.any(String),
      ingredient: 'toast point',
      category: 'carb',
      cold: true
    };

    // **patch return (await getId(const.id) toEq)**
    expect(res.body).toEqual(expected);
    expect(await Charcuterie.getCharcById(newCharc.id)).toEqual(expected);
  });

  // delete (const:insert, res:delete(link/id), const:ALL)
  it('should delete single char row based on id', async () => {
    const newCharc = await Charcuterie.insert({ ingredient: 'toast point', category: 'carb', cold: false });

    const res = await request(app)
      .delete(`/api/v1/charcuteries${newCharc.id}`);

    const charcList = await Charcuterie.getAllCharcs();

    // **del ret (ex:All.not.toContain(res.body))
    expect(charcList).not.toContain(res.body);
  });
});
