var Q = require('q'),
    User = require('../../models/account/User');

var RegisterUserService = function RegisterUserService(userData) {
    var deferred = Q.defer();

    var user = User.register(userData.firstName, userData.lastName, userData.email, userData.password);

    user.save(function (err) {
        if (err) {
            return deferred.reject(err);
        }

        deferred.resolve(user);
    });

    return deferred.promise;
};

module.exports.execute = RegisterUserService;
