var eventManager = require('../../../infrastructure/events/eventManager');

'use strict';

module.exports = function (schema, options) {
    schema.add({
        _pendingEvents: {type: Array, default: []}
    });

    schema.method('raise', function (event) {
        this._pendingEvents = this._pendingEvents || [];
        this._pendingEvents.push(event);
    });

    schema.method('releaseEvents', function () {
        var events = this._pendingEvents;
        this._pendingEvents = undefined;

        return events || [];
    });

    schema.post('save', function (doc) {
        var events = eventManager.dispatchFor(doc);
    });
};
