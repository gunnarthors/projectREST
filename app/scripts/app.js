'use strict';

angular.module('projectRestApp', [
    'ngResource',
    'ngRoute'
 ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/admin', {
                templateUrl: 'views/admin.html',
                controller: 'AdminCtrl'
            })
            .when('/student', {
                templateUrl: 'views/student.html',
                controller: 'StudentCtrl'
            })
            .when('/createTemplate', {
                templateUrl: 'views/create.html',
                controller: 'CreateCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
