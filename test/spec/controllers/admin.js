'use strict';

describe('projectRestApp.AdminCtrl', function () {
    var $httpBackend, $rootScope, createController;

    beforeEach(module('projectRestApp'));

    beforeEach(inject(function($injector, $templateCache){

        $httpBackend = $injector.get('$httpBackend');

        $rootScope = $injector.get('$rootScope');

        $templateCache.put('views/main.html', '.<template-goes-here />');
        $templateCache.put('views/create.html', '.<template-goes-here />');
        $templateCache.put('modalTime.html', '.<template-goes-here />');

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
    it('should test load of admin controller', function(){

        var controller = createController();
        $rootScope.token = {Authorization:'Basic undefined', Accept: 'application/json, text/plain, */*'};

        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/evaluations', $rootScope.token).respond(201, {data:'fakedata'});
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/evaluationtemplates', $rootScope.token).respond(201, {data:'fakedata'});
        $httpBackend.flush();

    });

    it('should test errors in load of admin controller', function(){

        var controller = createController();
        $rootScope.token = {Authorization:'Basic undefined', Accept: 'application/json, text/plain, */*'};

        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/evaluations', $rootScope.token).respond(401);
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/evaluationtemplates', $rootScope.token).respond(401);
        $httpBackend.flush();

    });

    it('should open template', function(){
        var controller = createController();

        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/evaluations', $rootScope.token).respond(201, {data:'fakedata'});
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/evaluationtemplates', $rootScope.token).respond(201, {data:'fakedata'});

        $rootScope.openTemp(25);
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/evaluationtemplates/25', $rootScope.token).respond(201, {data: 'fakedata'});
        $httpBackend.flush();
    });

    it('should open template', function(){
        var controller = createController();

        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/evaluations', $rootScope.token).respond(201, {data:'fakedata'});
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/evaluationtemplates', $rootScope.token).respond(201, {data:'fakedata'});

        $rootScope.openTemp(25);
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/evaluationtemplates/25', $rootScope.token).respond(401);
        $httpBackend.flush();
    });

    it('should make evaluation public', function(){
        var controller = createController();

        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/evaluations', $rootScope.token).respond(201, {data:'fakedata'});
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/evaluationtemplates', $rootScope.token).respond(201, {data:'fakedata'});

        $rootScope.currID = 25;
        $rootScope.startDate = 'fakeDate';
        $rootScope.endDate = 'fakeDate';
        var dataobj = {
            TemplateID: $rootScope.currID,
            StartDate: $rootScope.startDate,
            EndDate: $rootScope.endDate
        };

        $rootScope.makePublic();
        $httpBackend.expectPOST('http://dispatch.ru.is/h14/api/v1/evaluations', dataobj, $rootScope.token).respond(201);
        $httpBackend.flush();
    });

    it('should return error in making evaluation public', function(){
        var controller = createController();

        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/evaluations', $rootScope.token).respond(201, {data:'fakedata'});
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/evaluationtemplates', $rootScope.token).respond(201, {data:'fakedata'});

        var dataobj = {};

        $rootScope.makePublic();
        $httpBackend.expectPOST('http://dispatch.ru.is/h14/api/v1/evaluations', dataobj, $rootScope.token).respond(401);
        $httpBackend.flush();
    });

    it('should return error in making evaluation public', function(){
        var controller = createController();

        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/evaluations', $rootScope.token).respond(201, {data:'fakedata'});
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/evaluationtemplates', $rootScope.token).respond(201, {data:'fakedata'});

        $rootScope.currID = 'undefined';

        $rootScope.makePublic();

        $httpBackend.flush();
    });

    it('should check few functions in admin controller', function(){
        var controller = createController();

        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/evaluations', $rootScope.token).respond(201, {data:'fakedata'});
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/evaluationtemplates', $rootScope.token).respond(201, {data:'fakedata'});

        $rootScope.clear();
        expect($rootScope.dt).toBe(null);

        $rootScope.toggleWeeks();
        expect($rootScope.showWeeks).toBe(false);

        $rootScope.createTemplate();

        $rootScope.check = true;
        var myDate = new Date('April 1, 1990 11:13:00');
        $rootScope.dt = myDate;
        $rootScope.disabled();
        expect($rootScope.startDate).toBe('1990-04-01');

        $rootScope.check = false;
        $rootScope.disabled();
        expect($rootScope.endDate).toBe('1990-04-01');

        $rootScope.check = true;
        myDate = new Date('October 21, 1990 11:13:00');
        $rootScope.dt = myDate;
        $rootScope.disabled();
        expect($rootScope.startDate).toBe('1990-10-21');

        $rootScope.check = false;
        $rootScope.disabled();
        expect($rootScope.endDate).toBe('1990-10-21');

        $rootScope.reload();

        $httpBackend.flush();
    });

    it('should get results from server', function(){
        var controller = createController();

        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/evaluations', $rootScope.token).respond(201, {data:'fakedata'});
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/evaluationtemplates', $rootScope.token).respond(201, {data:'fakedata'});

        $rootScope.showResult(25);
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/evaluations/25', $rootScope.token).respond(201, {data: 'fake'});
        expect($rootScope.results).toBe(undefined);

        $httpBackend.flush();
    });

    it('should test modal', function(){
        var controller = createController();

        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/evaluations', $rootScope.token).respond(201, {data:'fakedata'});
        $httpBackend.expectGET('http://dispatch.ru.is/h14/api/v1/evaluationtemplates', $rootScope.token).respond(201, {data:'fakedata'});

        $rootScope.openTime();

        $rootScope.ismeridian = true;
        expect($rootScope.ismeridian).toBe(true);

        $httpBackend.flush();
    });

});
