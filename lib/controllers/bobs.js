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
    const bobs = await Bob.getAllBobQuotes();

    res.send(bobs);
  })
//.get id (req.params.id)
  .get('/:id', async (req, res) => {
    const bob = await Bob.getBobQuoteById(req.params.id);

    res.send(bob);
  })
//.patch (req.params.id, req.body)
  .patch('/:id', async (req, res) => {
    const bob = await Bob.updateBobQuote(req.params.id, req.body);

    res.send(bob);
  })
//.delete (req.params.id, req.body)
  .delete('/:id', async (req, res) => {
    const bob = await Bob.deleteBobQuote(req.params.id);

    res.send(bob);
  });
