/**
 * Module that will handle our authentication tasks
 */
'use strict';

var AccessToken = require('../../domain/models/index').AccessToken,
    User = require('../../domain/models/index').User,
    BearerStrategy = require('passport-http-bearer').Strategy,
    InvalidAccessTokenError = require('../errors/oauth/InvalidAccessTokenError');

module.exports = function bearerStrategy() {
    return new BearerStrategy(function (accessToken, done) {
        console.log('BEARER STRATEGY');

        AccessToken.findOne({
            token: accessToken
        }, function (err, returnedToken) {
            if (err) {
                return done(err);
            } else if (!returnedToken) {
                return done(new InvalidAccessTokenError(), null, null);
            } else if (returnedToken.expirationDate < Date.now()) {
                return returnedToken.remove(function (err) {
                    if (err) {
                        return done(err);
                    }

                    return done(new InvalidAccessTokenError());
                });
            } else if (returnedToken.userId !== null) {
                User.findById(returnedToken.userId, function (err, user) {
                    if (err) {
                        return done(err);
                    } else if (!user) {
                        return done(new InvalidAccessTokenError());
                    }

                    var info = {
                        accessToken: {
                            user: returnedToken.user,
                            token: returnedToken.token,
                            expirationDate: returnedToken.expirationDate,
                            created: returnedToken.created
                        }
                    };

                    return done(null, user, info);
                });
            }
        });
    });
};
