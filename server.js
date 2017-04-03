const config = require('./config/config.js'),
      express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      fs = require('fs');


//MongoDB connection
mongoose.connect(config.db.dbms + '://' + config.db.host + ((config.db.port) ? ':' + config.db.port : '') + '/' + config.db.db);
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.db.dbms + '://' + config.db.host + ((config.db.port) ? ':' + config.db.port : '') + '/' + config.db.database);
});
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

//API 
const app = express();
app.use(express.static(__dirname + config.dir.app));
app.use(config.dir.images, express.static(__dirname + config.dir.images));
let routers = {};
fs.readdirSync(__dirname + config.dir.router).forEach((filename)=>{
    if(~filename.indexOf('.js')){
        let section = filename.split('.')[0];
        routers[section] = require(__dirname + config.dir.router + '/' + filename);
        app.use('/api/' + section + '/', routers[section]);
    }
});

app.use(bodyParser.json({}));

app.listen(config.port, () => {
    console.log('Server works on port ' + config.port);
});