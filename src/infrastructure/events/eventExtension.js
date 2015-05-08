var EventManager = require('./eventManager');

module.exports = {
    extend: function (obj) {
        obj.dispatchEventsFor = function (entity) {
            return EventManager.dispatchFor(entity);
        };

        obj.dispatchEvents = function (events) {
            return EventManager.dispatch(events);
        };

        obj.prepareEvents = function (entity) {
            return entity.releaseEvents();
        };

        return obj;
    }
};
