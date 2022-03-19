const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Bob = require('../lib/models/Bob');

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
  // getSingle(id) (id:1, res:get/exID)
  // patch(update) (const:insert, res:patch(link/id)/send(new), ex:id/string)
    // **patch return (await getId(const.id) toEq)**
  // delete (const:insert, res:delete(link/id), const:ALL)
    // **del ret (ex:All.not.toContain(res.body))
});
