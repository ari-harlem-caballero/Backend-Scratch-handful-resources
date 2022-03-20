const { Router } = require('express');
const TVShow = require('../models/TVShow');


module.exports = Router()
  .post('/', async (req, res) => {
    const tvshow = await TVShow.insert(req.body);

    res.send(tvshow);
  });

