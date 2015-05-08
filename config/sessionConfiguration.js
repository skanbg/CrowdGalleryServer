var session = require('express-session');

module.exports = function (config, app) {
    app.use(session({
        secret: 'crowd-gallery',
        name: 'crowd-gallery',
        proxy: true,
        resave: true,
        saveUninitialized: true
    }));
};