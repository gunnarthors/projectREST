'use strict';

describe('Modules projectRestApp', function() {
    describe('projectRestApp Module:', function() {

        var module;
        beforeEach(function() {
            module = angular.module('projectRestApp');
        });

        it('should be registered', function() {
            expect(module).not.toBe(null);
        });

        describe('Dependencies:', function() {

            var deps;
            var hasModule = function(m) {
                return deps.indexOf(m) >= 0;
            };
            beforeEach(function() {
                deps = module.value('projectRestApp').requires;
            });

            //you can also test the module's dependencies
            it('should have MainCtrl as a dependency', function() {
                expect(hasModule('projectRestApp.MainCtrl')).toBeTruthy();
            });

            it('should have studentCtrl as a dependency', function() {
                expect(hasModule('projectRestApp.StudentCtrl')).toBeTruthy();
            });

            it('should have adminCtrl as a dependency', function() {
                expect(hasModule('projectRestApp.AdminCtrl')).toBeTruthy();
            });

            it('should have createCtrl as a dependency', function() {
                expect(hasModule('projectRestApp.CreateCtrl')).toBeTruthy();
            });

            it('should have directive as a dependency', function() {
                expect(hasModule('projectRestApp.directive')).toBeTruthy();
            });
            it('should have service as a dependency', function() {
                expect(hasModule('projectRestApp.service')).toBeTruthy();
            });
            it('should have factory as a dependency', function() {
                expect(hasModule('projectRestApp.factory')).toBeTruthy();
            });
            it('should have ui-bootstrap as a dependency', function() {
                expect(hasModule('ui.bootstrap')).toBeTruthy();
            });
        });
    });
});
