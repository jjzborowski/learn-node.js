const express = require('express'),
      router = express.Router(),
      subtype = require('../schema/subtype.schema');

router.get('/', (req, res)=>{
    subtype.getCollection(req, res);
});

router.get('/id/:id', (req, res)=>{
    subtype.getItemById(req, res);
});

module.exports = router;