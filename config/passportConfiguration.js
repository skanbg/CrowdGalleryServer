var passport = require('passport'),
    localStrategy = require('../src/application/oauth/local-strategy'),
    bearerStrategy = require('../src/application/oauth/bearer-strategy'),
    findUserByIdService = require('../src/domain/services/account/findUserByIdService');

module.exports = function (config, app) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        findUserByIdService.execute(id)
            .then(function (user) {
                done(null, user);
            }, function (err) {
                done(err, null);
            });
    });
    passport.use(localStrategy());
    passport.use(bearerStrategy());
    app.use(passport.initialize());
    app.use(passport.session());
};