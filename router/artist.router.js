const express = require('express'),
      router = express.Router(),
      artist = require('../schema/artist.schema');

router.get('/', (req, res)=>{
    artist.getCollection(req, res);
});

router.get('/id/:id', (req, res)=>{
    artist.getItemById(req, res);
});

module.exports = router;