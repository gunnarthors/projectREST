'use strict';

angular.module('projectRestApp.StudentCtrl', [])
    .controller('StudentCtrl',['$scope', 'BackEnd', '$route', function ($scope, BackEnd, $route) {
        $scope.param = $route.current.params;

        // Get student courses
        BackEnd.authRequest('GET', 'http://project3api.haukurhaf.net/api/v1/my/courses', $scope.param.token)
            .success(function(data){
                $scope.courses = data;
            })
            .error(function(status){
                $scope.Cerror = status;
            });

        // Get student evaluation
        // server error ??
//        BackEnd.authRequest('GET', 'http://project3api.haukurhaf.net/api/v1/my/evaluations', $scope.param.token)
//            .success(function(data){
//                $scope.evaluations = data;
//            })
//            .error(function(status){
//                $scope.Eerror = status;
//            });
}]);