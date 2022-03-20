const { Router } = require('express');
const TVShow = require('../models/TVShow');


module.exports = Router()
  .post('/', async (req, res) => {
    const tvshow = await TVShow.insert(req.body);

    res.send(tvshow);
  })

  .get('/', async (req, res) => {
    const tvshows = await TVShow.getAllTVShows();

    res.send(tvshows);
  })

  .get('/:id', async (req, res) => {
    const tvshow = await TVShow.getTVShowById(req.params.id);

    res.send(tvshow);
  })

  .patch('/:id', async (req, res) => {
    const tvshow = await TVShow.updateTVShow(req.params.id, req.body);

    res.send(tvshow);
  });

