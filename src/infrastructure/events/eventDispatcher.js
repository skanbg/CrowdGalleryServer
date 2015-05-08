var eventDispatcher = (function () {
    var executioner = {};

    executioner.dispatch = function dispatch(events, eventEmitter) {
        var event,
            i,
            eventName,
            eventsCount = events.length;

        for (i = 0; i < eventsCount; i++) {
            event = events[i];
            eventName = executioner.getEventName(event);
            eventEmitter.emit(eventName, event);
            //console.log(eventName + ' was fired');
        }
    };

    executioner.getEventName = function getEventName(event) {
        return event.constructor.name;
    };

    return executioner;
})();

module.exports = eventDispatcher;
