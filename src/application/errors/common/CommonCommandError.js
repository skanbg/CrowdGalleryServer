var CommandError = require('../CommandError');

var CommonCommandError = function CommonCommandError() {
    this.name = 'CommonCommandError';
};

CommonCommandError.prototype = Object.create(CommandError.prototype);
CommonCommandError.prototype.constructor = CommonCommandError;

module.exports = CommonCommandError;
