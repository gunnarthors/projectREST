'use strict';

angular.module('projectRestApp', [
    'ngResource',
    'ngRoute',
    'projectRestApp.MainCtrl',
    'projectRestApp.StudentCtrl',
    'projectRestApp.service'
 ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/admin/:token', {
                templateUrl: 'views/admin.html',
                controller: 'AdminCtrl'
            })
            .when('/:name/:token', {
                templateUrl: 'views/student.html',
                controller: 'StudentCtrl'
            })
            .when('/:token/createTemplate', {
                templateUrl: 'views/create.html',
                controller: 'CreateCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);


