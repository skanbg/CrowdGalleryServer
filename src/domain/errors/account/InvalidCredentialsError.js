var DescriptiveDomainError = require('../DescriptiveDomainError');

var InvalidCredentialsError = function InvalidCredentialsError(message) {
    this.name = 'InvalidCredentialsError';
    this.message = message || 'The credentials are not correct. Ask user to check them';
};

InvalidCredentialsError.prototype = Object.create(DescriptiveDomainError.prototype);
InvalidCredentialsError.prototype.constructor = InvalidCredentialsError;

module.exports = InvalidCredentialsError;
