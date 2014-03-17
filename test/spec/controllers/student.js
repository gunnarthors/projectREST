'use strict';

describe('Controller: StudentCtrl', function () {
//    var $httpBackend, createController;
    // load the controller's module
    beforeEach(module('projectRestApp'));

    var StudentCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $injector) {

//        $httpBackend = $injector.get('httpBackend');
//        createController = function() {
//            return $controller('StudentCtrl', {'$scope': $rootScope});
//        };

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
    });

    it('when function courseStuff variables value change', function () {
        expect(scope.courseID).toBeUndefined();
        expect(scope.year).toBeUndefined();
        expect(scope.teacherInf).toBe(true);
        scope.courseStuff(1,'2014-01-14T00:00:00');
        expect(scope.teacherInf).toBe(false);
        expect(scope.courseID).toBe(1);
        expect(scope.year).toBe('2014');
    });

    it('testing if old answer is poped out if user changes answer', function () {

        scope.chosen('Frustrated', 39);
//        var length = scope.ansArray.length;
//  expect(ansObj.QuestionID).toBe(39);
        if(scope.ansArray.length === 0){
            expect(scope.ansArray).toEqual([]);
        }

//        if(scope.ansArray.length > 0) {
//            scope.ansArray.forEach(function(data){
//                expect(scope.ansArray.QuestionID).toContain(39);
//                if(data.QuestionID === 39){
//                    expect(scope.ansArray).not.toContain(39);
//                }
//                if (data.QuestionID !== 100){
//                    expect(scope.ansArray.length).toEqual(length);
//                }
//            });
//        }





    });

//    $scope.chosen = function(value, ID) {
//        var ansObj = {
//            QuestionID: ID,
//            TeacherSSN: $scope.currentTeacher,
//            Value: value
//        };
//        if($scope.ansArray.length > 0){
//            $scope.ansArray.forEach(function(data){
//                if(data.QuestionID === ID ){
//                    var index =  $scope.ansArray.indexOf(data);
//                    if(index > -1) {
//                        $scope.ansArray.splice(index, 1);
//                    }
//                }
//            });
//        }
//        $scope.ansArray.push(ansObj);


});
