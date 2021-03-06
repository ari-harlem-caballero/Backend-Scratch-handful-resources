// Router, express
// charcs, model
const Charcuterie = require('../models/Charcuterie');
const { Router } = require('express');


// (req/res, const/await(body), res.send(const))
module.exports = Router()

//.post/insert (req.body)
  .post('/', async (req, res) => {
    const charc = await Charcuterie.insert(req.body);

    res.send(charc);
  })

//.get ALL
  .get('/', async (req, res) => {
    const charcs = await Charcuterie.getAllCharcs();

    res.send(charcs);
  })

//.get id (req.params.id)
  .get('/:id', async (req, res) => {
    const charc = await Charcuterie.getCharcById(req.params.id);

    res.send(charc);
  })

//.patch (req.params.id, req.body)
  .patch('/:id', async (req, res) => {
    const charc = await Charcuterie.updateCharc(req.params.id, req.body);

    res.send(charc);
  })

//.delete (req.params.id)
  .delete('/:id', async (req, res) => {
    const charc = await Charcuterie.deleteCharc(req.params.id);

    res.send(charc);
  });
