var Q = require('q'),
    AccessToken = require('../../../domain/models/oauth/access-token'),
    uidGenerator = require('../../../infrastructure/utilities/uidGenerator');

function expirationDateCalculator(interval) {
    return new Date(new Date().getTime() + (interval * 1000));
}

var generateAccessTokenService = function generateAccessTokenService(user) {
    var deferred = Q.defer();

    var accessTokenLength = 256,
        expirationDate = expirationDateCalculator(3600);
    var token = uidGenerator.uid(accessTokenLength);
    var generatedAccessToken = AccessToken.generate(user, expirationDate, token);

    generatedAccessToken.save(function (err) {
        if (err) {
            return deferred.reject(err);
        }

        deferred.resolve(generatedAccessToken);
    });

    return deferred.promise;
};

module.exports.execute = generateAccessTokenService;
