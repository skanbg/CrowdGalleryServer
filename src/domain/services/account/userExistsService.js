var Q = require('q'),
    User = require('../../models/account/User');

var UserExistsService = function UserExistsService(email) {
    var deferred = Q.defer();

    User.findOne({email: email}, function (err, returnedUser) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(returnedUser);
        }
    });

    return deferred.promise;
};

module.exports.execute = UserExistsService;
