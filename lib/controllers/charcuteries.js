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
  });
//.get ALL
//.get id (req.params.id)
//.patch (req.params.id, req.body)
//.delete (req.params.id)
