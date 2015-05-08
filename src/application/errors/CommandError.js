var CommandError = function CommandError(message, errorPath) {
    this.name = 'CommandError';
    this.message = message || 'General error';
    this.errorPath = errorPath || 'unknown';
};

CommandError.prototype = Object.create(Error.prototype);
CommandError.prototype.constructor = CommandError;

module.exports = CommandError;
