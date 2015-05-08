/**
 * A model for our user
 */
'use strict';
var mongoose = require('mongoose'),
    Q = require('q'),
    Locking = require('./../common/Locking'),
    EventGenerator = require('./../common/EventGenerator'),
    bcrypt = require('bcrypt'),
    crypto = require('../../../infrastructure/utilities/cryptoManager'),
    UserHasRegistered = require('../../events/account/UserHasRegistered');

var UserModel = function () {
    var userSchema = mongoose.Schema({
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, unique: true},
        password: {type: String},
        role: String
    });

    userSchema.pre('save', function (next) {
        var user = this;

        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) {
            return next();
        }

        bcrypt.hash(user.password, crypto.getCryptLevel(), function (err, hash) {
            user.password = hash;
            next();
        });
    });

    /**
     * Helper function that takes a plaintext password and compares it against the user's hashed password.
     * @param plainText
     * @returns true/false
     */
    userSchema.methods.passwordMatches = function (plainText) {
        var deferred = Q.defer();

        var user = this;
        bcrypt.compare(plainText, user.password, function (err, res) {
            if (err || !res) {
                deferred.reject(new Error(err));
            }

            deferred.resolve(res);
        });

        return deferred.promise;
    };

    userSchema.static('register', function (firstName, lastName, email, password) {
        var newUser = new this();
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.email = email;
        newUser.password = password;

        newUser.raise(new UserHasRegistered(firstName, lastName, email));

        return newUser;
    });

    userSchema.plugin(Locking);
    userSchema.plugin(EventGenerator);

    return mongoose.model('User', userSchema);
};

module.exports = UserModel();
