'use strict';

describe('projectRestApp.MainCtrl login', function () {
    var $httpBackend, $rootScope, createController;

    beforeEach(module('projectRestApp'));

    beforeEach(inject(function($injector){

        $httpBackend = $injector.get('$httpBackend');

        $rootScope = $injector.get('$rootScope');

        var $controller = $injector.get('$controller');

        createController = function(){
            return $controller('MainCtrl', {'$scope': $rootScope});
        };
    }));


    afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should login with username and pass as student', function(){
        var controller = createController();

        var data = {
            Token: 'Z3VubmFyczA5OjEyMzQ=',
            User : {
                FullName: 'Gunnar Thor Stefansson',
                Username: 'gunnars09',
                SSN: '2104842809',
                Role: 'student'
            }
        };

        $rootScope.usr.user = 'gunnars09';
        $rootScope.usr.pass = '123';

        $rootScope.loginUsr();
        $httpBackend.expectPOST('http://dispatch.ru.is/h14/api/v1/login').respond(201, data);
        $httpBackend.flush();
    });

    it('should login with username and pass as admin', function(){
        var controller = createController();

        var data = {
            Token: 'Z3VubmFyczA5OjEyMzQ=',
            User : {
                Role: 'admin'
            }
        };

        $rootScope.usr.user = 'admin';
        $rootScope.usr.pass = '123';

        $rootScope.loginUsr();
        $httpBackend.expectPOST('http://dispatch.ru.is/h14/api/v1/login').respond(201, data);
        $httpBackend.flush();
    });

    it('should not get authorized to log in', function(){
        var controller = createController();

        $rootScope.usr.user = 'notUser';
        $rootScope.usr.pass = '123';

        $rootScope.loginUsr();
        $httpBackend.expectPOST('http://dispatch.ru.is/h14/api/v1/login').respond(401, 'undefined', 'undefined');
        $httpBackend.flush();
    });
});
