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

  // create, getAll, getSingle(id), patch(update), delete
  it('should add new bob quote to bobs table', async () => {
    const expected = 
    {
      quote: 'Kids are horrible. Why do we keep making them?',
      character: 'Bob Belcher',
      season: 4,
      episode: 17,
    };

    const res = await request(app)
      .post('/api/v1/bobs')
      .send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
