var path = require('path');

var rootPath = path.normalize(__dirname + '/../');

module.exports = {
    development: {
        rootPath: rootPath,
        controllersDir: path.join(rootPath, 'controllers'),
        db: 'mongodb://localhost/crowdgallery',
        port: process.env.PORT || 3000,
        cryptLevel: 10
    },
    production: {
        rootPath: rootPath,
        controllersDir: path.join(rootPath, 'controllers'),
        db: 'mongodb://pesho:pesho3velik@ds039351.mongolab.com:39351/crowdgallery',
        port: process.env.PORT || 3000,
        cryptLevel: 10
    }
};