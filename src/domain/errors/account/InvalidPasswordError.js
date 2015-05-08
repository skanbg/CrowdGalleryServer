var DescriptiveDomainError = require('../DescriptiveDomainError');

var InvalidPasswordError = function InvalidPasswordError(message) {
    this.name = 'InvalidPasswordError';
    this.message = message || 'Password format is not valid';
};

InvalidPasswordError.prototype = Object.create(DescriptiveDomainError.prototype);
InvalidPasswordError.prototype.constructor = InvalidPasswordError;

module.exports = InvalidPasswordError;
