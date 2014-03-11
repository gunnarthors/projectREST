'use strict';

angular.module('projectRestApp.StudentCtrl', [])
    .controller('StudentCtrl',['$scope', 'BackEnd', '$route', function ($scope, BackEnd, $route) {
        $scope.param = $route.current.params;
        BackEnd.authRequest('GET', 'http://project3api.haukurhaf.net/api/v1/my/courses', $scope.param.token)
            .success(function(data){
                $scope.courses = data;
            })
            .error(function(status){
                $scope.error = status;
            });
}]);