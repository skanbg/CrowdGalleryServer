var DescriptiveDomainError = require('../DescriptiveDomainError');

var InvalidFirstNameError = function InvalidFirstNameError(message) {
    this.name = 'InvalidFirstNameError';
    this.message = message || 'First name format is not valid';
};

InvalidFirstNameError.prototype = Object.create(DescriptiveDomainError.prototype);
InvalidFirstNameError.prototype.constructor = InvalidFirstNameError;

module.exports = InvalidFirstNameError;
