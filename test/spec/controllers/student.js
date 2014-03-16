'use strict';

describe('Controller: StudentCtrl', function () {

    // load the controller's module
    beforeEach(module('projectRestApp'));

    var StudentCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $routeParams) {
        scope = $rootScope.$new();

        StudentCtrl = $controller('StudentCtrl', {
            $scope: scope
//            route: {
//                name: 'hildura12',
//                token: 'aGlsZHVyYTEyOg=='
//            }
        });
    }));

    it('should attach a list of awesomeThings to the scope', function () {

        expect(scope.open).toBe(false);
        expect(scope.teacherInf).toBe(true);
    });
});
