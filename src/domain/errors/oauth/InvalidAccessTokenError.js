var DescriptiveDomainError = require('../DescriptiveDomainError');

var InvalidAccessTokenError = function InvalidAccessTokenError(message) {
    this.name = 'InvalidAccessTokenError';
    this.message = message || 'The token is not attached to the request or is expired!';
};

InvalidAccessTokenError.prototype = Object.create(DescriptiveDomainError.prototype);
InvalidAccessTokenError.prototype.constructor = InvalidAccessTokenError;

module.exports = InvalidAccessTokenError;
