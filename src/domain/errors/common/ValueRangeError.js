var CommonDomainError = require('./CommonDomainError');

var ValueRangeError = function ValueRangeError(min, max, errorPath, message) {
    this.name = 'ValueRangeError';
    this.min = min;
    this.max = max;
    this.errorPath = errorPath;
    this.message = message || (errorPath + ' must be between ' + min + ' and ' + max);
};

ValueRangeError.prototype = Object.create(CommonDomainError.prototype);
ValueRangeError.prototype.constructor = ValueRangeError;

module.exports = ValueRangeError;
