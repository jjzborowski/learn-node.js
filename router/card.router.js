const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cards = require('../schema/card.schema');

router.get('/', (req, res)=>{
    cards.getCollection(req, res);
});

router.post('/find', bodyParser.json({}), (req, res)=>{
    cards.getItem(req, res);
});

router.post('/insert', bodyParser.json({limit: 50000000}), (req, res)=>{
    cards.addItem(req, res);
});

module.exports = router;