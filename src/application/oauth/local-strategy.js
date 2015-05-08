/**
 * Module that will handle our authentication tasks
 */
'use strict';

var User = require('../../domain/models/index').User,
    LocalStrategy = require('passport-local').Strategy,
    InvalidCredentialsError = require('../../domain/errors/index').InvalidCredentialsError,
    UserAccountIsLockedError = require('../../domain/errors/index').UserAccountIsLockedError;

module.exports = function () {
    return new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (email, password, done) {
        console.log('LOCAL STRATEGY');

        //Retrieve the user from the database by login
        User.findOne({
            email: email
        }, function (err, user) {
            if (err) {
                return done(err);
            }

            if (user === null) {
                return done(new InvalidCredentialsError(), user);
            }

            if (user.isLocked) {
                // just increment login attempts if account is already locked
                return user.incLoginAttempts(function (err) {
                    return done(new UserAccountIsLockedError(), false);
                });
            }

            //Make sure that the provided password matches what's in the DB.
            user.passwordMatches(password)
                .then(function (areEaqual) {
                    //If everything passes, return the retrieved user object.
                    done(null, user);
                })
                .fail(function () {
                    user.incLoginAttempts()
                        .done(function () {
                            done(new InvalidCredentialsError(), false);
                        });
                });
        });
    });
};
