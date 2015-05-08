var CommonCommandError = require('./CommonCommandError');

var ParameterRequiredError = function ParameterRequiredError(errorPath, message) {
    this.name = 'ParameterRequiredError';
    this.errorPath = errorPath;
    this.message = message || errorPath + ' is required';
};

ParameterRequiredError.prototype = Object.create(CommonCommandError.prototype);
ParameterRequiredError.prototype.constructor = ParameterRequiredError;

module.exports = ParameterRequiredError;
