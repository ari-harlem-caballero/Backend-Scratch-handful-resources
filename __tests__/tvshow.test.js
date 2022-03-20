const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const TVShow = require('../lib/models/TVShow');

describe('alchemy-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  // create (ex:new, res:post(link)/send(ex), toEq:id/string, sprEx)
  it('should create a new row in tvshow table', async () => {
    const expected = 
    {
      title: 'Haikyuu!!',
      genre: ['Animation', 'Comedy', 'Drama', 'Sports'],
      seasons: 4,
      episodes: 88,
      runTime: 24,
      active: false
    };

    const res = await request(app)
      .post('/api/v1/tvshows')
      .send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  // getAll (res:get)
  it('should get all rows in tvshow table', async () => {
    const expected = await TVShow.getAllTVShows();

    const res = await request(app)
      .get('/api/v1/tvshows');

    expect(res.body).toEqual(expected);
  });

  // getSingle(id) (id:1, res:get/exID, ret:sprEx)
  it('should get a row from tvshows table based on ID', async () => {
    const expected = await TVShow.getTVShowById(1);

    const res = await request(app)
      .get(`/api/v1/tvshows/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });

  // patch(update) (const:insert, res:patch(link/id)/send(new), ex:id/string)
    // **patch return (await getId(const.id) toEq)
  // delete (const:insert, res:delete(link/id), const:ALL)
    // **del ret (ex:All.not.toContain(res.body))
});
