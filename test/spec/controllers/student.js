'use strict';

describe('Controller: StudentCtrl', function () {

    var $httpBackend, $rootScope, createController;

    beforeEach(module('projectRestApp'));

    beforeEach(inject(function($injector, $templateCache){

        $httpBackend = $injector.get('$httpBackend');

        $rootScope = $injector.get('$rootScope');

        $templateCache.put('views/main.html', '.<template-goes-here/>');

        var $controller = $injector.get('$controller');

        createController = function(){
            return $controller('StudentCtrl', {'$scope': $rootScope});
        };
    }));

    afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('testing if local variables are set like supposed to', function () {
        createController();
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/my/courses', $rootScope.token).respond(201, {DateBegin: 'fake', CourseID: 'fake'});
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/my/evaluations', $rootScope.token).respond(401);

        expect($rootScope.open).toBe(false);
        expect($rootScope.open).not.toBe(true);
        expect($rootScope.teacherInf).toBe(true);
        expect($rootScope.teacherInf).not.toBe(false);
        $httpBackend.flush();
    });

    it('testing if currentTeacher is set to empty string in the beginning', function () {
        createController();
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/my/courses', $rootScope.token).respond(201, {DateBegin: 'fake', CourseID: 'fake'});
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/my/evaluations', $rootScope.token).respond(401);
        expect($rootScope.currentTeacher).toBe('');
        $httpBackend.flush();
    });

    it('testing if array is empty in the beginning', function () {
        createController();
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/my/courses', $rootScope.token).respond(201, {DateBegin: 'fake', CourseID: 'fake'});
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/my/evaluations', $rootScope.token).respond(401);
        expect($rootScope.ansArray).toEqual([]);
        $httpBackend.flush();
    });

    it('when function courseStuff variables value change', function () {
        createController();
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/my/courses', $rootScope.token).respond(201, {DateBegin: 'fake', CourseID: 'fake'});
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/my/evaluations', $rootScope.token).respond(401);
        expect($rootScope.courseID).toBeUndefined();
        expect($rootScope.year).toBeUndefined();
        expect($rootScope.teacherInf).toBe(true);
        $rootScope.courseStuff(1,'2014-01-14T00:00:00');
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/courses/' + $rootScope.courseID + '/' + $rootScope.year + '/teachers', $rootScope.token).respond(201, {data: 'fake'});
        expect($rootScope.teacherInf).toBe(false);
        expect($rootScope.courseID).toBe(1);
        expect($rootScope.year).toBe('2014');
        $httpBackend.flush();

    });
    it('testing if old answer is poped out if user changes answer', function () {
        createController();
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/my/courses', $rootScope.token).respond(201, {DateBegin: 'fake', CourseID: 'fake'});
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/my/evaluations', $rootScope.token).respond(401);
        $rootScope.courseStuff(1,'2014-01-14T00:00:00');
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/courses/' + $rootScope.courseID + '/' + $rootScope.year + '/teachers', $rootScope.token).respond(401);
        $httpBackend.flush();
    });

    it('testing if evaluation opens', function () {
        createController();
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/my/courses', $rootScope.token).respond(201, {DateBegin: 'fake', CourseID: 'fake'});
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/my/evaluations', $rootScope.token).respond(401);
        $rootScope.openEval(20, 'T-427-WEPO' );
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/courses/T-427-WEPO/20141/evaluations/20', $rootScope.token).respond(201, {data:'fake'});
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/courses/T-427-WEPO/20141/teachers',  $rootScope.token).respond(201, [{SSN: 'fake'},{SSN: 'fake'}]);
        $httpBackend.flush();
    });

    it('testing if eval answers are sent', function () {
        createController();
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/my/courses', $rootScope.token).respond(201, {DateBegin: 'fake', CourseID: 'fake'});
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/my/evaluations', $rootScope.token).respond(401);

        $rootScope.currentCourse ='T-501-FMAL';
        $rootScope.currentID = '20';
        $rootScope.sendAns();
        $httpBackend.expectPOST('http://dispatch.ru.is/h14/api/v1/courses/' + $rootScope.currentCourse + '/20141/evaluations/'+ $rootScope.currentID,$rootScope.token).respond(201, [{data:'fake'}]);
        expect($rootScope.ansArray).toEqual([]);
        $httpBackend.flush();
    });

    it('testing if eval answers are sent', function () {
        createController();
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/my/courses', $rootScope.token).respond(201, {DateBegin: 'fake', CourseID: 'fake'});
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/my/evaluations', $rootScope.token).respond(401);
        $rootScope.home();
        $httpBackend.flush();
    });

    it('testing if eval answers are sent', function () {
        createController();
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/my/courses', $rootScope.token).respond(201, {DateBegin: 'fake', CourseID: 'fake'});
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/my/evaluations', $rootScope.token).respond(401);
        $rootScope.home();
        $httpBackend.flush();
    });


    it('testing if old answer is poped out if user changes answer', function () {
        var data = {
            DateBegin: 'fake',
            CourseID: 'fake'
        };
        createController();
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/my/courses', $rootScope.token).respond(401, data);
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/my/evaluations', $rootScope.token).respond(401);
        $rootScope.chosen('Frustrated', 39);
//        var length = scope.ansArray.length;
//  expect(ansObj.QuestionID).toBe(39);
        if($rootScope.ansArray.length === 0){
            expect($rootScope.ansArray).toEqual([]);
        }
        if($rootScope.ansArray.length > 0){
            if(data.QuestionID === 39){
                expect($rootScope.QuestionID).not.toContain(39);
            }
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
        $httpBackend.flush();
    });
});
