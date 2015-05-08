var DescriptiveCommandError = require('../DescriptiveCommandError');

var InvalidAccessTokenError = function InvalidAccessTokenError(message) {
    this.name = 'InvalidAccessTokenError';
    this.message = message || 'The token is not attached to the request or is expired!';
};

InvalidAccessTokenError.prototype = Object.create(DescriptiveCommandError.prototype);
InvalidAccessTokenError.prototype.constructor = InvalidAccessTokenError;

module.exports = InvalidAccessTokenError;
