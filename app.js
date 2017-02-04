const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const fs = require('fs');

const artists = require('./schema/artists.schema');
const colors = require('./schema/colors.schema');
const expansions = require('./schema/expansions.schema');
const rarity = require('./schema/rarity.schema');
const types = require('./schema/types.schema');
const subtypes = require('./schema/subtypes.schema');

const port = '8882';

mongoose.connect('mongodb://127.0.0.1:27017/elves');
const db = mongoose.connection;
const app = express();

app.use(express.static(__dirname+'/app'));


app.get('/', (req, res)=>{
    res.send('hello world');
});

app.get('/api/colors', (req, res)=>{
    colors.find({})
        .exec((err, result)=>{
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

app.get('/api/colors/:id', (req, res)=>{
    colors.findOne({
        _id: req.params.id 
    })
        .exec((err, result)=>{
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

app.listen(port, () => {
    console.log('ok');
});

//fs.readFile('app/index.html', (error, html) => {
//    if(error){
//        throw error
//    }
//
//    http.createServer((request, response) => {
//        response.statusCode = 200;
//        response.setHeader('Content-type', 'text/html');
//        response.write(html);
//        response.end();
//    }).listen(port, host, () => {
//        console.log('Server started on port ' + port);
//    });
//});
