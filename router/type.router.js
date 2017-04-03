const express = require('express'),
      router = express.Router(),
      type = require('../schema/type.schema');

router.get('/', (req, res)=>{
    type.getCollection(req, res);
});

router.get('/id/:id', (req, res)=>{
    type.getItemById(req, res);
});

module.exports = router;