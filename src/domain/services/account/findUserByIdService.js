var Q = require('q'),
    User = require('../../models/account/User');

var findUserByIdService = function findUserByIdService(id) {
    var deferred = Q.defer();

    User.findOne({_id: id}, function (err, returnedUser) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(returnedUser);
        }
    });

    return deferred.promise;
};

module.exports.execute = findUserByIdService;
