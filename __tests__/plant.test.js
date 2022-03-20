const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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
  // getSingle(id) (id:1, res:get/exID, ret:sprEx)
  // patch(update) (const:insert, res:patch(link/id)/send(new), ex:id/string)
    // **patch return (await getId(const.id) toEq)
  // delete (const:insert, res:delete(link/id), const:ALL)
    // **del ret (ex:All.not.toContain(res.body))

});
