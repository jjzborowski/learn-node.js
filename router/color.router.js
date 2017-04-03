const express = require('express'),
      router = express.Router(),
      color = require('../schema/color.schema');

router.get('/', (req, res)=>{
    color.getCollection(req, res);
});

router.get('/id/:id', (req, res)=>{
    color.getItemById(req, res);
});

module.exports = router;