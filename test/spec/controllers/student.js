'use strict';

describe('Controller: StudentCtrl', function () {

    // load the controller's module
    beforeEach(module('projectRestApp'));

    var StudentCtrl,
        scope;

//    var fakeUser = {
//        fullName: 'Hildur Andrjesdóttir',
//        token: 'aGlsZHVyYTEyOg=='
//    };




    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();

        StudentCtrl = $controller('StudentCtrl', {
            $scope: scope
        });
    }));

    it('testing if local variables are set like supposed to', function () {
        expect(scope.open).toBe(false);
        expect(scope.open).not.toBe(true);
        expect(scope.teacherInf).toBe(true);
        expect(scope.teacherInf).not.toBe(false);
    });
    it('testing if currentTeacher is set to empty string in the beginning', function () {
        expect(scope.currentTeacher).toBe('');
    });
    it('testing if array is empty in the beginning', function () {
        expect(scope.ansArray).toEqual([]);
    });//aksdjfæasdjfklasdjfæ

});
