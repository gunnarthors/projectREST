
'use strict';

angular.module('projectRestApp.MainCtrl', [])
    .controller('MainCtrl',['$scope', '$location', 'BackEnd', 'UserFactory', function ($scope, $location, BackEnd, UserFactory) {

        // log in function
        $scope.loginUsr = function() {
            BackEnd.login($scope.usr)
                .success(function(data) {
                    $scope.name = data.User.Username;
                    $scope.token = data.Token;
                    console.log(data.User.Role);
                    if(data.User.Role === 'student'){
                        UserFactory.setUserFullName(data.User.FullName);
                        UserFactory.setUsername(data.User.Username);
                        UserFactory.setUserSSN(data.User.SSN);
                        console.log(UserFactory.getUserFullName());
                        console.log(UserFactory.getUsername());
                        console.log(UserFactory.getUserSSN());
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
                    $scope.errorMessage = 'Ooops! you entered wrong username or password, pleace try again!!!';
                    $scope.error = true;
                    $scope.error.header = headers;
                });
        };

        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    }]);
