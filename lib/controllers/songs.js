const { Router } = require('express');
const Song = require('../models/Song');

module.exports = Router ()

  .post('/', async (req, res) => {
    const song = await Song.insert(req.body);

    res.send(song);
  })

  .get('/', async (req, res) => {
    const songs = await Song.getAllSongs(req.body);

    res.send(songs);
  })

  .get('/:id', async (req, res) => {
    const song = await Song.getSongById(req.params.id);

    res.send(song);
  })
  
  .patch('/:id', async (req, res) => {
    const song = await Song.updateSongById(req.params.id, req.body);
  
    res.send(song);
  })

  .delete('/:id', async (req, res) => {
    const song = await Song.deleteById(req.params.id, req.body);

    res.send(song);
  });
