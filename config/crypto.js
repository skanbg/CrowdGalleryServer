var path = require('path');

module.exports = function (config) {
    var cryptoManagerPath = path.join(config.rootPath, 'src/infrastructure/utilities/cryptoManager');
    require(cryptoManagerPath).setCryptLevel(config.cryptLevel);
};