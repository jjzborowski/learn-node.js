const express = require('express'),
      router = express.Router(),
      expansion = require('../schema/expansion.schema');

router.get('/', (req, res)=>{
    expansion.getCollection(req, res);
});

router.get('/id/:id', (req, res)=>{
    expansion.getItemById(req, res);
});

module.exports = router;