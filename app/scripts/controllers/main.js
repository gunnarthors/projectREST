'use strict';

angular.module('projectRestApp.MainCtrl', [])
    .controller('MainCtrl',['$scope', '$location', '$resource', 'BackEnd', 'Restangular', function ($scope, $location, $resource, BackEnd, Restangular) {

        var base = BackEnd.all('login');
        $scope.loginUsr = function() {
            console.log($scope.usr);
            base.post($scope.usr).then(function(data){
                $scope.name = data.User.Username;
                $scope.token = data.Token;
                $location.path('/' + $scope.name + '/' + $scope.token);
            });
        };

        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
   }]);
