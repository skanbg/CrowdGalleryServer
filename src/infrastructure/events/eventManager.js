var eventDispatcher = require('./eventDispatcher'),
    events = require('events');

var eventManager = (function () {
    var executioner = {},
        eventEmitter = new events.EventEmitter();

    executioner.dispatch = function dispatch(events) {
        if (events.constructor !== Array) {
            events = [events];
        }

        eventDispatcher.dispatch(events, eventEmitter);
    };

    executioner.dispatchFor = function dispatchEventsFor(dispatchableObject) {
        return this.dispatch(dispatchableObject.releaseEvents());
    };

    executioner.subscribe = function handle(eventSignature, eventHandler) {
        eventEmitter.on(eventSignature, eventHandler);
    };

    executioner.unsubscribe = function unsubscribe(eventSignature, eventHandler) {
        eventEmitter.removeListener(eventSignature, eventHandler)
    };

    return executioner;
})();

module.exports = eventManager;
