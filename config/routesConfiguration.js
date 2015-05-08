var enrouten = require('express-enrouten');

module.exports = function (config, app) {
    var controllersDir = config.controllersDir;

    app.use(enrouten({
        directory: controllersDir
    }));
};