var Q = require('q');

var BaseCommand = require('./BaseCommand'),
    GeneralCommanderError = require('./errors/GeneralCommanderError');

var commander = (function () {
    var executor = {},
        executionQueue = [],
        commands = {},
        registeredCommandsQueueCount = 0;

    function immediateCommandExecute(deferred, Command) {
        var commandName = Command.constructor.name;
        var commandHandler = commands[commandName];

        if (commandHandler) {
            commandHandler.call(commandHandler.ref, Command)
                .then(function (data) {
                    deferred.resolve(data);
                }, function (error) {
                    deferred.reject(error);
                });
        } else {
            throw new GeneralCommanderError('Command "' + commandName + '" not registered');
        }
    }

    executor.execute = function (Command) {
        var deferred = Q.defer(),
            commandName = Command.constructor.name,
            commandHandler = commands[commandName];

        if (!commandHandler) {
            throw new GeneralCommanderError('Command "' + commandName + '" not registered');
        }

        immediateCommandExecute(deferred, Command);

        return deferred.promise;
    };

    executor.handle = function (Command, commandHandler) {
        if (!Command || !(new Command() instanceof BaseCommand)) {
            throw new TypeError('Command is not instance of ' + BaseCommand.name);
        }

        if (!commandHandler || typeof commandHandler !== 'function') {
            throw new TypeError('Command handler is not a function');
        }

        commands[Command.name] = commandHandler;
        registeredCommandsQueueCount++;
    };

    executor.pendingExecutionsCount = function () {
        return executionQueue.length;
    };

    executor.registeredHandlersCount = function () {
        return registeredCommandsQueueCount;
    };

    executor.clear = function () {
        executionQueue = [];
        commands = {};
        registeredCommandsQueueCount = 0;
    };

    return executor;
})();

module.exports = commander;
