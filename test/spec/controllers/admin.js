'use strict';

describe('projectRestApp.AdminCtrl login', function () {
    var $httpBackend, $rootScope, createController;

    beforeEach(module('projectRestApp'));

    beforeEach(inject(function($injector){

        $httpBackend = $injector.get('$httpBackend');

        $rootScope = $injector.get('$rootScope');

        var $controller = $injector.get('$controller');

        createController = function(){
            return $controller('AdminCtrl', {'$scope': $rootScope});
        };
    }));

    afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    //on load call to factory
//    it('should open template', function(){
//        var controller = createController();
//
//        $rootScope.token = 'Z3VubmFyczA5OjEyMzQ=';
//
//        BackEnd.authRequest();
//        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/evaluations', 'Z3VubmFyczA5OjEyMzQ=').respond(201, {data: 'fakedata'});
//        $httpBackend.flush();
//    });


    //not working yet need to set test first to all load on run first!
//    it('should open template', function(){
//        var controller = createController();
//
//        $rootScope.token = 'Z3VubmFyczA5OjEyMzQ=';
//
//        $rootScope.openTemp(1);
//        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/evaluationtemplates/1', 'Z3VubmFyczA5OjEyMzQ=').respond(201, {data: 'fakedata'});
//        $httpBackend.flush();
//    });

});
