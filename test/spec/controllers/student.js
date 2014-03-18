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
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/my/courses', $rootScope.token).respond(201, data);
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/my/evaluations', $rootScope.token).respond(401);
        $rootScope.chosen('Frustrated', 39);
        var count = 0;
        var length = $rootScope.ansArray.length;
        if($rootScope.ansArray.length === 0){
            expect($rootScope.ansArray).toEqual([]);
        }

        if($rootScope.ansArray.length > 0){
            console.log($rootScope.ansArray);
            $rootScope.ansArray.forEach(function(entry){
                count = count + 1;
                if(data.QuestionID === 39){
                    expect($rootScope.ansArray.indexOf(entry)).toBe(0);
                }
                else{
                }
            });

        }
        expect(length).toEqual(count);
//     $scope.ansArray = [];
//        $scope.chosen = function(value, ID) {
//            console.log(value + '  ' + ID);
//            var ansObj = {
//                QuestionID: ID,
//                TeacherSSN: $scope.currentTeacher,
//                Value: value
//            };
//            if($scope.ansArray.length > 0){
//                $scope.ansArray.forEach(function(data){
//                    if(data.QuestionID === ID ){
//                        var index =  $scope.ansArray.indexOf(data);
//                        if(index > -1) {
//                            $scope.ansArray.splice(index, 1);
//                        }
//                    }
//                });
//            }
//            $scope.ansArray.push(ansObj);
        $httpBackend.flush();
    });

    it('testing if student gets his evaluation', function () {
        var data = [{ CourseID: 'T-427-WEPO',
            ID: 21}, {CourseID: 'T-427-WEPO', ID: 20}];
        var info = { ID: 21, TemplateID: 37, TitleEN:'mid term'};
        createController();
        $rootScope.arr = [];
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/my/courses', $rootScope.token).respond(401);
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/my/evaluations', $rootScope.token).respond(201, data);

        data.forEach(function(entry){
            $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/courses/' + entry.CourseID + '/20141/evaluations/' + entry.ID,  $rootScope.token).respond(201, info);

        });
        $httpBackend.flush();
    });

});

//BackEnd.authRequest('GET', 'http://dispatch.ru.is/h14/api/v1/my/evaluations', $scope.token)
//    .success(function(data){
//        $scope.evaluations = data;
//        $scope.arr = [];
//        data.forEach(function(entry){
//            BackEnd.authRequest('GET', 'http://dispatch.ru.is/h14/api/v1/courses/' + entry.CourseID + '/20141/evaluations/' + entry.ID,  $scope.token)
//                .success(function(info){
//                    var obj = entry;
//                    obj.TitleEN = info.TitleEN;
//                    $scope.arr.push(obj);
//                })
//                .error(function(){
//                    console.log('ERROR');
//                });
//        });
//    })