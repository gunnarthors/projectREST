'use strict';

angular.module('projectRestApp.StudentCtrl', [])
    .controller('StudentCtrl',['$scope', 'BackEnd', '$route', function ($scope, BackEnd, $route) {
        $scope.param = $route.current.params;

          // Get student courses
        BackEnd.authRequest('GET', 'http://project3api.haukurhaf.net/api/v1/my/courses', $scope.param.token)
            .success(function(data){
                $scope.courses = data;
                console.log(data);
                $scope.semester = data.DateBegin;
                $scope.courseID = data.CourseID;
            })
            .error(function(status){
                $scope.Cerror = status;
            });

        $scope.courseStuff = function(ID, time){
            $scope.courseID = ID;
            $scope.year = time.substr(0,4);
            BackEnd.authRequest('GET', 'http://dispatch.ru.is/h14/api/v1/courses/' + ID + '/' + $scope.year + '/teachers', $scope.param.token)
                .success(function(data){
                    console.log(data);
                    $scope.courseTeachers = data;
                    $scope.specialCourse = true;
                })
                .error(function(status){
                    $scope.TError = status;
                });
//            BackEnd.authRequest('GET', 'http://dispatch.ru.is/h14/api/v1/courses/' + ID + '/' + $scope.year + '/evaluations/1', $scope.param.token)
//                .success(function(data){                                                                                           //{evalID}
//                    $scope.courseEvaluation = data;
//                    console.log(data);
//                })
//                .error(function(status){
//                    $scope.EError = status;
//                });
        };
        BackEnd.authRequest('GET', 'http://dispatch.ru.is/h14/api/v1/my/evaluations', $scope.param.token)
            .success(function(data){
                console.log(data);
                $scope.evaluations = data;
            })
            .error(function(status){
                $scope.Eerror = status;
            });
        // Get studen evaluation
        // server error ??
//        BackEnd.authRequest('GET', 'http://dispatch.ru.is/h14/api/v1/my/evaluations', $scope.param.token)
//            .success(function(data){
//                $scope.evaluations = data;
//            })
//            .error(function(status){
//                $scope.Eerror = status;
//            });
}]);