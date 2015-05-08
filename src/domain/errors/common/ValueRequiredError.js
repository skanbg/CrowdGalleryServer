var CommonDomainError = require('./CommonDomainError');

var ValueRequiredError = function ValueRequiredError(errorPath, message) {
    this.name = 'ValueRequiredError';
    this.errorPath = errorPath;
    this.message = message || errorPath + ' is required';
};

ValueRequiredError.prototype = Object.create(CommonDomainError.prototype);
ValueRequiredError.prototype.constructor = ValueRequiredError;

module.exports = ValueRequiredError;
