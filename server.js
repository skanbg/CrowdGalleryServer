var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

//var env = process.env.NODE_ENV || 'development';
var env = process.env.NODE_ENV || 'production';

var app = express(),
    config = require('./config/config')[env];

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./config/crypto')(config);
require('./config/db')(config);
require('./config/corsConfiguration')(config, app);
require('./config/sessionConfiguration')(config, app);
require('./config/passportConfiguration')(config, app);
require('./config/commandsConfiguration')();
require('./config/eventsConfiguration')();
require('./config/routesConfiguration')(config, app);
require('./config/crashHandler')(config, app);

app.listen(config.port);
console.log("Server is listening on port " + config.port);