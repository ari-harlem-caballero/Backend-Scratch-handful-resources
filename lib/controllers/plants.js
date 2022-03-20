// Router, express
// charcs, model
const { Router } = require('express');
const Plant = require('../models/Plant');

// (req/res, const/await, res.send(const))
module.exports = Router()

//.post/insert (req.body)
  .post('/', async (req, res) => {
    const plant = await Plant.insert(req.body);

    res.send(plant);
  });

//.get ALL
//.get id (req.params.id)
//.patch (req.params.id, req.body)
//.delete (req.params.id)
