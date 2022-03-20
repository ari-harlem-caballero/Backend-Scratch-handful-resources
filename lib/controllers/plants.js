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
  })

//.get ALL
  .get('/', async (req, res) => {
    const plants = await Plant.getAllPlants();

    res.send(plants);
  })

//.get id (req.params.id)
  .get('/:id', async (req, res) => {
    const plant = await Plant.getPlantById(req.params.id);

    res.send(plant);
  });
//.patch (req.params.id, req.body)
//.delete (req.params.id)
