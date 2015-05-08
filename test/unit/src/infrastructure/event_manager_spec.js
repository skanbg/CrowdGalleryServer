/*global describe:false, it:false*/

'use strict';

var expect = require('chai').expect,
    mockery = require('mockery'),
    _ = require('lodash'),
    EventManagerPath = '../../../../src/infrastructure/events/eventManager',
    EventDispatcherPath = '../../../../src/infrastructure/events/eventDispatcher';

describe('#EventManager', function () {

    var registeredEvents = [],
        dispatchedEvents = [];

    beforeEach(function (done) {
        var fakeEventsMock = {
            EventEmitter: function () {
                return {
                    on: function (signature, handler) {
                        registeredEvents.push({
                            signature: signature,
                            handler: handler
                        });
                    },
                    removeListener: function (signature, handler) {
                        registeredEvents = _.remove('domain.' + registeredEvents, function (registeredEvent) {
                            return registeredEvent.signature == signature;
                        });
                    }
                };
            }
        };

        mockery.registerAllowable(EventManagerPath);
        mockery.registerMock('events', fakeEventsMock);

        var fakeEventDispatcherMock = {
            dispatch: function (events, emitter) {
                dispatchedEvents.push(events);
            }
        };
        mockery.registerAllowable(EventDispatcherPath);
        mockery.registerMock('./EventDispatcher', fakeEventDispatcherMock);

        mockery.enable({useCleanCache: true});
        done();
    });

    afterEach(function (done) {
        registeredEvents = [];
        dispatchedEvents = [];
        mockery.disable();
        mockery.deregisterAll();
        done();
    });

    describe('subscribing for event', function () {

        it('should add event listener', function () {
            var EventManager = require(EventManagerPath);
            var testHandler = function () {
            };
            EventManager.subscribe('some-signature', testHandler);
            expect(registeredEvents.length).to.equal(1);
        });
    });

    describe('unsubscribing for event', function () {

        it('should remove event listener', function () {
            var EventManager = require(EventManagerPath);
            var testHandler = function () {
            };
            EventManager.subscribe('some-signature', testHandler);
            EventManager.unsubscribe('some-signature', testHandler);
            expect(registeredEvents.length).to.equal(0);
        });
    });

});
