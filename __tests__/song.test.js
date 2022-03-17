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
  it('creates a new song', async () => {
    const expected =
    const res =

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
