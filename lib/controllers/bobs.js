// Router, express
const { Router } = require('express');
// bob, model
const Bob = require('../models/Bob');

// (req/res, const/await, res.send(const))
module.exports = Router()
//.post/insert (req.body)
  .post('/', async (req, res) => {
    const bob = await Bob.insert(req.body);

    res.send(bob);
  })
//.get ALL
  .get('/', async (req, res) => {
    const bob = await Bob.getAllBobQuotes();

    res.send(bob);
  });
//.get id (req.params.id)
//.patch (req.params.id, req.body)
//.delete (req.params.id, req.body)
