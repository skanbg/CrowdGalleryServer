var BaseCommand = require('../../../infrastructure/commands/BaseCommand'),
    applicationErrors = require('../../errors'),
    Q = require('q');

var RegisterUserCommand = function RegisterUserCommand(firstName, lastName, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
};

BaseCommand.inherit(RegisterUserCommand);

RegisterUserCommand.prototype.validate = function () {
    var self = this;
    var deferred = Q.defer();

    process.nextTick(function () {
        var errors = [];

        for (var key in self) {
            if (self.hasOwnProperty(key) && !self[key]) {
                errors.push(new applicationErrors.ParameterRequiredError(key));
            }
        }

        if (errors.length > 0) {
            deferred.reject(errors);
        } else {
            deferred.resolve();
        }
    });

    return deferred.promise;
};

module.exports = RegisterUserCommand;
