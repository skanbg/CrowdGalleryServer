var Q = require('q'),
    passport = require('passport');

module.exports = function (req, res, next) {
    var deferred = Q.defer();

    passport.authenticate('bearer', function (err, user, info) {
        if (err || !user) {
            return deferred.reject(err);
        }

        return deferred.resolve({user: user, info: info});
    })(req, res, next);

    return deferred.promise;
};
