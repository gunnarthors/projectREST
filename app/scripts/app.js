'use strict';

angular.module('projectRestApp', [
    'ngResource',
    'ngRoute',
    'projectRestApp.MainCtrl',
    'projectRestApp.StudentCtrl',
    'projectRestApp.AdminCtrl',
    'projectRestApp.CreateCtrl',
    'projectRestApp.directive',
    'projectRestApp.service',
    'projectRestApp.factory',
    'ui.bootstrap'
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
            .when('/admin/createTemplate/:token', {
                templateUrl: 'views/create.html',
                controller: 'CreateCtrl'
            })
            .when('/:name/:token', {
                templateUrl: 'views/student.html',
                controller: 'StudentCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
