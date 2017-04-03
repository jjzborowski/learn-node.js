const express = require('express'),
      router = express.Router(),
      bodyParser = require('body-parser'),
      card = require('../schema/card.schema');

router.get('/', (req, res)=>{
    card.getCollection(req, res);
});

router.post('/find', bodyParser.json({}), (req, res)=>{
    card.getItem(req, res);
});

router.post('/insert', bodyParser.json({limit: 50000000}), (req, res)=>{
    card.addItem(req, res);
});

module.exports = router;