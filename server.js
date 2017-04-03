const config = require('./config/config.js'),
      express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      fs = require('fs');


//MongoDB connection
mongoose.connect(config.database.dbms + '://' + config.database.host + ((config.database.port) ? ':' + config.database.port : '') + '/' + config.database.db);
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database.dbms + '://' + config.database.host + ((config.database.port) ? ':' + config.database.port : '') + '/' + config.database.db);
});
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

//API 
const app = express();
app.use(express.static(__dirname + '/app'));
let routers = {};
fs.readdirSync(__dirname + '/router').forEach((filename)=>{
    if(~filename.indexOf('.js')){
        let section = filename.split('.')[0];
        routers[section] = require(__dirname + '/router/' + filename);
        app.use('/api/' + section + '/', routers[section]);
    }
});
//const artists = require('./router/artists.router');
//const colors = require('./router/colors.router');
//const expansions = require('./router/expansions.router');
//const rarities = require('./router/rarities.router');
//const subtypes = require('./router/subtypes.router');
//const types = require('./router/types.router');
//const cards = require('./router/cards.router');
//const labels = require('./router/labels.router');
//app.use('/api/artist/', artists);
//app.use('/api/color/', colors);
//app.use('/api/expansion/', expansions);
//app.use('/api/rarity/', rarities);
//app.use('/api/subtype/', subtypes);
//app.use('/api/type/', types);
//app.use('/api/card/', cards);
//app.use('/api/label/', labels);

app.use(bodyParser.json({}));

app.listen(config.port, () => {
    console.log('Server works on port ' + config.port);
});