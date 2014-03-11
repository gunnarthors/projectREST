'use strict';

angular.module('projectRestApp.MainCtrl', [])
    .controller('MainCtrl',['$scope', '$location', 'BackEnd', function ($scope, $location, BackEnd) {

        $scope.loginUsr = function() {
            BackEnd.login($scope.usr)
                .success(function(data) {
                    $scope.name = data.User.Username;
                    $scope.token = data.Token;
                    $location.path('/' + $scope.name + '/' + $scope.token);
                })
                .error(function(data, status, headers) {
                    $scope.error.status = status;
                    $scope.error.header = headers;
                });
        };

        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
   }]);
