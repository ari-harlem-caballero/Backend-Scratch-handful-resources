const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Song = require('../lib/models/Song');

describe('alchemy-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  // create, getAll, getSingle(id), patch(update), delete
  it('creates a new song', async () => {
    const expected = {
      title: 'Honey Whiskey',
      artist: 'SATICA',
      album: 'Honey Whiskey',
    };

    const res = await request(app)
      .post('/api/v1/songs')
      .send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('should get all songs in the db', async () => {
    const expected = await Song.getAllSongs();

    const res = await request(app)
      .get('/api/v1/songs');

    expect(res.body).toEqual(expected);
  });

  it('should get a single song based on ID', async () => {
    const expected = await Song.getSongById(1);

    const res = await request(app)
      .get(`/api/v1/songs/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });
});
