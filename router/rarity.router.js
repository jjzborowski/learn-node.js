const express = require('express'),
router = express.Router(),
rarity = require('../schema/rarity.schema');

router.get('/', (req, res)=>{
    rarity.getCollection(req, res);
});

router.get('/id/:id', (req, res)=>{
    rarity.getItemById(req, res);
});

module.exports = router;