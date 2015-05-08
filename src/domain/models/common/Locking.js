'use strict';

var Q = require('q');

var defaultOptions = {
    maxLoginAttempts: 10,
    lockTime: 5 * 60 * 1000
};

module.exports = function (schema, options) {
    //// Update configurations based on options
    if (!options) {
        options = defaultOptions;
    }

    // For password lock.
    schema.add({
        loginAttempts: {type: Number, required: true, default: 0},
        lockUntil: {type: Number}
    });

    schema.virtual('isLocked').get(function () {
        return !!(this.lockUntil && this.lockUntil > Date.now());
    });

    schema.methods.incLoginAttempts = function () {
        var deferred = Q.defer();

        // if we have a previous lock that has expired, restart at 1
        if (this.lockUntil && this.lockUntil < Date.now()) {
            this.update({
                $set: {loginAttempts: 1},
                $unset: {lockUntil: 1}
            }, function (err, doc) {
                if (err) {
                    return deferred.reject(err);
                }

                deferred.resolve(doc);
            });
        } else {
            // otherwise we're incrementing
            var updates = {$inc: {loginAttempts: 1}};
            // lock the account if we've reached max attempts and it's not locked already
            if (this.loginAttempts + 1 >= options.maxLoginAttempts && !this.isLocked) {
                updates.$set = {lockUntil: Date.now() + options.lockTime};
            }

            this.update(updates, function (err, doc) {
                if (err) {
                    return deferred.reject(err);
                }

                deferred.resolve(doc);
            });
        }

        return deferred.promise;
    };
};
