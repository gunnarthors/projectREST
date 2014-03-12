'use strict';

angular.module('projectRestApp.MainCtrl', [])
    .controller('MainCtrl',['$scope', '$location', 'BackEnd', function ($scope, $location, BackEnd) {

        // log in function
        $scope.loginUsr = function() {
            BackEnd.login($scope.usr)
                .success(function(data) {
                    $scope.name = data.User.Username;
                    $scope.token = data.Token;
                    console.log(data.User.Role);
                    if(data.User.Role === 'student'){
                        $location.path('/' + $scope.name + '/' + $scope.token);
                    }
                    else if(data.User.Role === 'admin'){
                        $location.path('/admin/' + $scope.token);
                    }
                    else {
                        console.log('Something went wrong');
                    }
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
