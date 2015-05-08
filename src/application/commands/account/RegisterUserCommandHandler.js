var Q = require('q'),
    userExistsService = require('../../../domain/services/account/userExistsService'),
    UserAlreadyExistsError = require('../../errors/account/UserAlreadyExistsError'),
    registrationUserService = require('../../../domain/services/account/addUserService');

var RegisterUserCommandHandler = function RegisterUserCommandHandler(userData) {
    var deferred = Q.defer();

    userExistsService.execute(userData.email)
        .then(function (user) {
            if (user) {
                return deferred.reject(new UserAlreadyExistsError());
            }

            registrationUserService.execute(userData)
                .then(function (user) {
                    return deferred.resolve(user);
                }, function (err) {
                    return deferred.reject(err);
                });
        }, function (err) {
            deferred.reject(err);
        });

    return deferred.promise;
};

module.exports = RegisterUserCommandHandler;
