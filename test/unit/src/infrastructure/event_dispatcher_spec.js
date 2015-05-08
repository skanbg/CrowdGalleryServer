/*global describe:false, it:false*/

'use strict';

var expect = require('chai').expect,
    _ = require('lodash'),
    EventDispatcher = require('../../../../src/infrastructure/events/eventDispatcher');

describe('#EventDispatcher', function () {

    describe('dispatching event', function () {

        it('should emit the Event Emitter', function (done) {
            var eventEmitter = {
                emit:function(eventSignature, event){
                    done();
                }
            };

            EventDispatcher.dispatch([{}], eventEmitter);
        });
    });

    describe('retrieving the event name', function () {

        it('should return the event name', function () {
            var TestEvent = function TestEvent(){

            };

            var testEvent = new TestEvent();
            expect(EventDispatcher.getEventName(testEvent)).to.equal(testEvent.constructor.name);
        });
    });

});
