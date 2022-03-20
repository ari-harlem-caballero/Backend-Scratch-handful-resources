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
  // getAll (res:get)
  // getSingle(id) (id:1, res:get/exID, ret:sprEx)
  // patch(update) (const:insert, res:patch(link/id)/send(new), ex:id/string)
    // **patch return (await getId(const.id) toEq)
  // delete (const:insert, res:delete(link/id), const:ALL)
    // **del ret (ex:All.not.toContain(res.body))