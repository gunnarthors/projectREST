'use strict';

angular.module('projectRestApp')
    .controller('AdminCtrl',['$scope', '$route', 'BackEnd', '$location', function ($scope, $route, BackEnd, $location) {
        $scope.param = $route.current.params;
        $scope.token = $scope.param.token;

        $scope.createTemplate = function(){
            $location.path('/admin/createTemplate/' + $scope.token);
        };

        // Get all evaluations
        BackEnd.authRequest('GET', 'http://dispatch.ru.is/h14/api/v1/evaluations', $scope.token)
            .success(function(data){
                console.log(data);
                $scope.evaluations = data;
            })
            .error(function(status){
                $scope.Eerror = status;
            });

        // Get all templates
        BackEnd.authRequest('GET', 'http://dispatch.ru.is/h14/api/v1/evaluationtemplates', $scope.token)
            .success(function(data){
                console.log(data);
                $scope.templates = data;
            })
            .error(function(status){
                $scope.Eerror = status;
            });

        $scope.openTemp = function(tempid){
            BackEnd.authRequest('GET', 'http://dispatch.ru.is/h14/api/v1/evaluationtemplates/'+ tempid, $scope.token)
            .success(function(data){
                console.log(data);
                $scope.evalTemp = data;
            })
            .error(function(status){
                $scope.Terror = status;
            });
        };


}]);