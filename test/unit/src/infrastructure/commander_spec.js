/*global describe:false, it:false*/

'use strict';

var expect = require('chai').expect,
    Q = require('q'),
    Commander = require('../../../../src/infrastructure/commands/Commander'),
    GeneralCommanderError = require('../../../../src/infrastructure/commands/errors/GeneralCommanderError'),
    BaseCommand = require('../../../../src/infrastructure/commands/BaseCommand');

describe('#Commander', function () {

    afterEach(function (done) {
        Commander.clear();
        done();
    });

    describe('when attaching handler to command', function () {

        describe('not of type BaseCommand', function () {
            it('should throw TypeError', function () {
                expect(function () {
                    Commander.handle({}, function () {
                    });
                }).to.throw(TypeError);
            });
        });

        describe('with handler that is not a function', function () {
            it('should throw TypeError', function () {
                expect(function () {
                    Commander.handle(BaseCommand);
                }).to.throw(TypeError);
            });
        });

        describe('with valid Command and handler', function () {
            it('should increment the registered handlers count', function () {
                Commander.handle(BaseCommand, function () {
                });
                expect(Commander.registeredHandlersCount()).to.equal(1);
            });
        });

    });

    describe('when executing command', function () {

        describe('with attached handler', function () {

            describe('of type BaseCommand', function () {
                it('should succeed with execution', function (done) {
                    Commander.handle(BaseCommand, function () {
                        var deferred = Q.defer();
                        deferred.resolve();
                        return deferred.promise;
                    });
                    Commander.execute(new BaseCommand())
                        .then(function () {
                            done();
                        });
                });
            });
        });

        describe('that is not registered', function () {

            describe('of type BaseCommand', function () {

                it('should throw GeneralCommanderError', function () {
                    expect(function () {
                        Commander.execute(new BaseCommand());
                    }).to.throw(GeneralCommanderError);
                });
            });

        });

    });

    describe('when clearing the commander', function () {

        it('should contain no registered commands', function () {
            Commander.handle(BaseCommand, function () {
            });
            Commander.clear();
            expect(Commander.registeredHandlersCount()).to.equal(0);
        });

    });

});
