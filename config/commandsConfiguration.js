var Commander = require('../src/infrastructure/commands/Commander'),
    handlerEnding = 'Handler',
    CommandsIndex = require('../src/application/commands/index');

module.exports = function () {
    for (var key in CommandsIndex) {
        var keyEnding = key.slice(-handlerEnding.length);

        if (keyEnding !== handlerEnding && CommandsIndex.hasOwnProperty(key)) {
            var command = CommandsIndex[key],
                commandHandler = CommandsIndex[key + handlerEnding];
            Commander.handle(command, commandHandler);
        } else if (key.slice(handlerEnding.length) === handlerEnding) {
            throw new Error('Command not registered');
        }
    }
};