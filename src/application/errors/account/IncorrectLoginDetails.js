var DescriptiveCommandError = require('../DescriptiveCommandError');

var IncorrectLoginDetails = function IncorrectLoginDetails(message) {
    this.name = 'IncorrectLoginDetails';
    this.message = message || 'The provided login data is incorrect';
};

IncorrectLoginDetails.prototype = Object.create(DescriptiveCommandError.prototype);
IncorrectLoginDetails.prototype.constructor = IncorrectLoginDetails;

module.exports = IncorrectLoginDetails;
