module.exports = function (app) {
    app.get('/', function (req, res, next) {
        res.status(200);
        res.json({
            hi: 'hello'
        });
    });
};