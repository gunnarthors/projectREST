'use strict';

describe('Controller: CreateCtrl', function () {

    var $httpBackend, $rootScope, createController;

    beforeEach(module('projectRestApp'));

    beforeEach(inject(function($injector, $templateCache){

        $httpBackend = $injector.get('$httpBackend');

        $rootScope = $injector.get('$rootScope');

        $templateCache.put('views/main.html', '.<template-goes-here/>');

        var $controller = $injector.get('$controller');

        createController = function(){
            return $controller('CreateCtrl', {'$scope': $rootScope});
        };
    }));

    afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('testing if eval object is described', function () {
        createController();
        $rootScope.evalDescript();
    });

    it('testing if question type is set to text', function () {
        createController();
        $rootScope.text();
        expect($rootScope.question.Type).toBe('text');
    });

    it('testing if question type is set to multi', function () {
        createController();
        $rootScope.multi();
        expect($rootScope.question.Type).toBe('multi');
    });

    it('testing if course question is added to eval object', function () {
        createController();
        $rootScope.question = {Answers: Array[2], Type: 'multi', TextEN: 'fake'};
        $rootScope.evalObject.CourseQuestions = [];
        $rootScope.addCourseQuestion();
        $rootScope.reset();
    });

    it('testing if teacher question type is set to multi', function () {
        createController();
        $rootScope.question = {Answers: Array[2], Type: 'multi', TextEN: 'fake'};
        $rootScope.evalObject.TeacherQuestions = [];
        $rootScope.addTeacherQuestion();
        $rootScope.reset();
    });

    it('testing if question object is reset to empty', function () {
        createController();
        $rootScope.reset();
        expect($rootScope.question).toEqual({Answers:[{TextIS: '', TextEN:'', ImageURL: '', Weight: ''},
            {TextIS: '', TextEN:'', ImageURL: '', Weight: ''}]});
    });

    it('testing if question object is reset to empty', function () {
        createController();
        $rootScope.addChoice();

    });

    it('testing if local variables are set like supposed to', function () {
        createController();
        $rootScope.saveTemplate();
        $httpBackend.expectPOST('http://dispatch.ru.is/h14/api/v1/evaluationtemplates', $rootScope.evalObject, $rootScope.token).respond(201);
        $httpBackend.flush();
    });
});