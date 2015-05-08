var DescriptiveDomainError = require('../DescriptiveDomainError');

var InvalidEmailError = function InvalidEmailError(message) {
    this.name = 'InvalidEmailError';
    this.message = message || 'The email format is not valid';
};

InvalidEmailError.prototype = Object.create(DescriptiveDomainError.prototype);
InvalidEmailError.prototype.constructor = InvalidEmailError;

module.exports = InvalidEmailError;
