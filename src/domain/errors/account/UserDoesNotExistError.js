var DescriptiveDomainError = require('../DescriptiveDomainError');

var UserDoesNotExistsError = function UserDoesNotExistsError(message) {
    this.name = 'UserDoesNotExistsError';
    this.message = message || 'Registered user with the searched criteria is not found';
};

UserDoesNotExistsError.prototype = Object.create(DescriptiveDomainError.prototype);
UserDoesNotExistsError.prototype.constructor = UserDoesNotExistsError;

module.exports = UserDoesNotExistsError;
