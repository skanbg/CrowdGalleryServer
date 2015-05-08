var DomainError = require('../DomainError');

var CommonDomainError = function CommonDomainError() {
    this.name = 'CommonDomainError';
};

CommonDomainError.prototype = Object.create(DomainError.prototype);
CommonDomainError.prototype.constructor = CommonDomainError;

module.exports = DomainError;
