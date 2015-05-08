var eventsManager = require('../src/infrastructure/events/eventManager');

module.exports = function () {
    eventsManager.subscribe('UserHasRegistered', function (event) {
        console.log('Send email with greetings to ' + event.firstName + ' ' + event.lastName);
    });
};