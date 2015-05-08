var commander = require('../../src/infrastructure/commands/Commander'),
    commandsList = require('../../src/application/commands'),
    oauth2 = require('../../src/application/oauth/oauth2'),
    bearerAuthenticator = require('../../src/application/oauth/bearerAuthenticator');

module.exports = function (app) {
    app.post('/create', function (req, res, next) {
        var registerCommand = commandsList.RegisterUserCommand.mapFromObject(req.body);

        registerCommand
            .validate()
            .then(function () {
                return commander.execute(registerCommand)
            })
            .then(function (user) {
                res.json({
                    user: {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName
                    }
                });
            })
            .catch(function (err) {
                next(err);
            });
    });

    app.post('/login', oauth2.token);

    app.get('/info', function (req, res, next) {
        bearerAuthenticator(req, res, next)
            .then(function (data) {
                res.json({
                    user: {
                        id: data.user.id,
                        firstName: data.user.firstName,
                        lastName: data.user.lastName
                    }
                });
            }, function (err) {
                next(err);
            });
    });
};