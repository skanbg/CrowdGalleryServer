var DomainError = function DomainError() {
    this.name = 'DomainError';
};

DomainError.prototype = Object.create(Error.prototype);
DomainError.prototype.constructor = DomainError;

module.exports = DomainError;
