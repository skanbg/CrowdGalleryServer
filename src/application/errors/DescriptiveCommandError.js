var CommandError = require('./CommandError');

var DescriptiveCommandError = function DescriptiveCommandError(message) {
    this.name = 'DescriptiveCommandError';
    this.message = message || 'General message';
};

DescriptiveCommandError.prototype = Object.create(CommandError.prototype);
DescriptiveCommandError.prototype.constructor = DescriptiveCommandError;

module.exports = DescriptiveCommandError;
