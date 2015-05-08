var util = require('util');

var GeneralCommanderError = function GeneralCommanderError() {
};

util.inherits(GeneralCommanderError, Error);

module.exports = GeneralCommanderError;
