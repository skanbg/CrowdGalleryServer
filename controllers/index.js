var formidable = require('formidable'),
    Image = require('../src/domain/models/gallery/Image'),
    bearerAuthenticator = require('../src/application/oauth/bearerAuthenticator'),
    MissingImageError = require('../src/application/errors/index').MissingImageError;

module.exports = function (app) {

    app.get('/', function (req, res, next) {
        res.status(200);
        res.json({
            hi: 'hello'
        });
    });
};