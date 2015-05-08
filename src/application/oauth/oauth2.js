/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var Q = require('q');
var _ = require('lodash');

var errors = require('../errors/index');
var passport = require('passport');

var generateAccessTokenService = require('../services/oauth/generateAccessTokenService');

/**
 * Token endpoint
 *
 * `token` middleware handles client requests to exchange authorization grants
 * for access tokens.  Based on the grant type being exchanged, the above
 * exchange middleware will be invoked to handle the request.  Clients must
 * authenticate when making requests to this endpoint.
 */
exports.token = [
    function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }

            if (!user) {
                return next(new errors.IncorrectLoginDetails());
            }

            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }

                return next();
            });
        })(req, res, next);
    },
    function (req, res, next) {
        generateAccessTokenService
            .execute(req.user)
            .then(function (generatedAccessToken) {
                res.json({
                    token: {
                        expirationDate: generatedAccessToken.expirationDate,
                        token: generatedAccessToken.token
                    }
                });
            });
    }
];
