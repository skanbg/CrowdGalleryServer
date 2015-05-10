//var cors = require('cors');

module.exports = function (config, app) {
    //app.use(cors());
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Length, Content-Type, Accept, Authorization");

        if (req.method.toLowerCase() == 'options') {
            res.status(200);
            res.end();
            return;
        }

        next();
    });
};