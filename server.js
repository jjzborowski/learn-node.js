const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const fs = require('fs');

const artists = require('./schema/artists.schema');
const colors = require('./schema/colors.schema');
const expansions = require('./schema/expansions.schema');
const rarities = require('./schema/rarities.schema');
const subtypes = require('./schema/subtypes.schema');
const types = require('./schema/types.schema');

const port = '8882';

mongoose.connect('mongodb://127.0.0.1:27017/elves');
const db = mongoose.connection;
const app = express();

app.use(express.static(__dirname+'/app'));


app.get('/', (req, res)=>{
    res.send('hello world');
});

app.get('/api/artist', (req, res)=>{
    artists.getArtists(req, res);
});

app.get('/api/color', (req, res)=>{
    colors.getColors(req, res);
});

app.get('/api/expansion', (req, res)=>{
    expansions.getExpansions(req, res);
});

app.get('/api/rarity', (req, res)=>{
    rarities.getRarity(req, res);
});

app.get('/api/subtype', (req, res)=>{
    subtypes.getSubtypes(req, res);
});

app.get('/api/type', (req, res)=>{
    types.getTypes(req, res);
});

app.get('/api/color/:id', (req, res)=>{
    colors.getColorById(req, res);
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
