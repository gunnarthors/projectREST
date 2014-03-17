
'use strict';

angular.module('projectRestApp.MainCtrl', [])
    .controller('MainCtrl',['$scope', '$location', 'BackEnd', 'UserFactory', function ($scope, $location, BackEnd, UserFactory) {
        // log in function
        $scope.usr = {};
        $scope.loginUsr = function() {
            BackEnd.login($scope.usr)
                .success(function(data) {
                    $scope.name = data.User.Username;
                    UserFactory.setUserToken(data.Token);
                    if(data.User.Role === 'student'){
                        UserFactory.setUserFullName(data.User.FullName);
                        UserFactory.setUsername(data.User.Username);
                        UserFactory.setUserSSN(data.User.SSN);
                        $location.path('/' + data.User.Username + '/' + data.Token);
                    }
                    else {
                        $location.path('/admin/' + data.Token);
                    }
                })
                .error(function(status, headers) {
                    $scope.errorMessage = 'Ooops! you entered wrong username or password, please try again!!!';
                    $scope.error = true;
                    $scope.error.header = headers;
                });
        };
    }]);
