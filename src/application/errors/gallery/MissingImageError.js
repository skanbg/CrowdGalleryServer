var DescriptiveCommandError = require('../DescriptiveCommandError');

var InvalidAccessTokenError = function InvalidAccessTokenError(message) {
    this.name = 'MissingImageError';
    this.message = message || 'No attached image!';
};

InvalidAccessTokenError.prototype = Object.create(DescriptiveCommandError.prototype);
InvalidAccessTokenError.prototype.constructor = InvalidAccessTokenError;

module.exports = InvalidAccessTokenError;
