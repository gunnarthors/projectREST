'use strict';

angular.module('projectRestApp')
    .controller('AdminCtrl',['$scope', '$route', 'BackEnd', function ($scope, $route, BackEnd) {
        $scope.param = $route.current.params;
        $scope.token = $scope.param.token;

        // Get all evaluations
        BackEnd.authRequest('GET', 'http://dispatch.hir.is/h14/api/v1/evaluations', $scope.token)
            .success(function(data){
                console.log(data);
                $scope.evaluations = data;
            })
            .error(function(status){
                $scope.Eerror = status;
            });

        // Get all templates
        BackEnd.authRequest('GET', 'http://dispatch.hir.is/h14/api/v1/evaluationtemplates', $scope.token)
            .success(function(data){
                console.log(data);
                $scope.templates = data;
            })
            .error(function(status){
                $scope.Eerror = status;
            });
}]);