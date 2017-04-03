const express = require('express'),
      router = express.Router(),
      label = require('../schema/label.schema');

router.get('/', (req, res)=>{
    label.getCollection(req, res);
});

router.get('/lang/:lang', (req, res)=>{
    label.getItemByLang(req, res);
});

module.exports = router;