var _ = require('lodash'),
    util = require('util');

var BaseCommand = function BaseCommand() {
};

BaseCommand.mapFromObject = function (givenObject) {
    var Command = this;
    var command = new Command();
    var keys = _.keys(command);
    _.extend(command, _.pick(givenObject, keys));

    return command;
};

BaseCommand.inherit = function (target) {
    _.extend(target, this);
    util.inherits(target, this);

    return target;
};

module.exports = BaseCommand;
