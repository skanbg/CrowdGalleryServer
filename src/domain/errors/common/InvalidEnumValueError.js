var CommonDomainError = require('./CommonDomainError');

var InvalidEnumValueError = function InvalidEnumValueError(errorPath, message) {
    this.name = 'InvalidEnumValueError';
    this.errorPath = errorPath;
    this.message = message || 'Given value with parameter ' + errorPath + ' is not possible value';
};

InvalidEnumValueError.prototype = Object.create(CommonDomainError.prototype);
InvalidEnumValueError.prototype.constructor = InvalidEnumValueError;

module.exports = InvalidEnumValueError;
