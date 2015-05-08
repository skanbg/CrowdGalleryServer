var DescriptiveDomainError = require('../DescriptiveDomainError');

var InvalidLastNameError = function InvalidLastNameError(message) {
    this.name = 'InvalidLastNameError';
    this.message = message || 'Last name format is not valid';
};

InvalidLastNameError.prototype = Object.create(DescriptiveDomainError.prototype);
InvalidLastNameError.prototype.constructor = InvalidLastNameError;

module.exports = InvalidLastNameError;
