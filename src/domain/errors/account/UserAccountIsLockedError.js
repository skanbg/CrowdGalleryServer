var DescriptiveDomainError = require('../DescriptiveDomainError');

var UserAccountIsLockedError = function UserAccountIsLockedError(message) {
    this.name = 'UserAccountIsLockedError';
    this.message = message || 'Too many attempts failed to login, so account is locked';
};

UserAccountIsLockedError.prototype = Object.create(DescriptiveDomainError.prototype);
UserAccountIsLockedError.prototype.constructor = UserAccountIsLockedError;

module.exports = UserAccountIsLockedError;
