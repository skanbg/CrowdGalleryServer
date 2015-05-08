var DomainError = require('./DomainError');

var DescriptiveDomainError = function DescriptiveDomainError() {
    this.name = 'DescriptiveDomainError';
};

DescriptiveDomainError.prototype = Object.create(DomainError.prototype);
DescriptiveDomainError.prototype.constructor = DescriptiveDomainError;

module.exports = DescriptiveDomainError;
