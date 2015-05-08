var DescriptiveCommandError = require('../DescriptiveCommandError');

var UserAlreadyExistsError = function UserAlreadyExistsError(message) {
    this.name = 'UserAlreadyExistsError';
    this.message = message || 'The provided email is already in our db';
};

UserAlreadyExistsError.prototype = Object.create(DescriptiveCommandError.prototype);
UserAlreadyExistsError.prototype.constructor = UserAlreadyExistsError;

module.exports = UserAlreadyExistsError;
