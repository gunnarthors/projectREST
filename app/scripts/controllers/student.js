'use strict';

angular.module('projectRestApp.StudentCtrl', [])
    .controller('StudentCtrl',['$scope', 'BackEnd', 'UserFactory', '$route', function ($scope, BackEnd, UserFactory, $route) {
        $scope.param = $route.current.params;
        $scope.open = false;
        $scope.fullName = UserFactory.getUserFullName();

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
                    $scope.courseTeachers = data;
                    $scope.specialCourse = true;
                })
                .error(function(status){
                    $scope.TError = status;
                });

        };

        $scope.home = function() {
            $route.reload();
        };

        BackEnd.authRequest('GET', 'http://dispatch.ru.is/h14/api/v1/my/evaluations', $scope.param.token)
            .success(function(data){
                $scope.evaluations = data;
                $scope.arr = [];
                data.forEach(function(entry){
                    BackEnd.authRequest('GET', 'http://dispatch.ru.is/h14/api/v1/courses/' + entry.CourseID + '/20141/evaluations/' + entry.ID,  $scope.param.token)
                        .success(function(info){
                            var obj = entry;
                            obj.TitleEN = info.TitleEN;
                            $scope.arr.push(obj);

                        });
                });
            })
            .error(function(status){
                $scope.Eerror = status;
            });
        $scope.currentTeacher ='';

        $scope.openEval = function(ID, course) {
            BackEnd.authRequest('GET', 'http://dispatch.ru.is/h14/api/v1/courses/' + course + '/20141/evaluations/' + ID,  $scope.param.token)
                .success(function(data){
                    $scope.open = true;
                    $scope.openedEvaluation = data;
                    $scope.currentID = ID;
                    $scope.currentCourse = course;

                });
            BackEnd.authRequest('GET', 'http://dispatch.ru.is/h14/api/v1/courses/' + course + '/20141/teachers',  $scope.param.token)
                .success(function(data){
                    $scope.currentTeacher = data[0].SSN;
                });
        };

        $scope.ansArray = [];
        $scope.chosen = function(value, ID) {
            console.log(ID);
            var ansObj = {
                QuestionID: ID,
                TeacherSSN: $scope.currentTeacher,
                Value: value
            };
            if($scope.ansArray.length > 0){
                $scope.ansArray.forEach(function(data){
                    if(data.QuestionID === ID ){
                        var index =  $scope.ansArray.indexOf(data);
                        if(index > -1) {
                            $scope.ansArray.splice(index, 1);
                        }
                    }
                });
            }
            $scope.ansArray.push(ansObj);
        };
        $scope.sendAns = function() {
            BackEnd.authPOST('POST', 'http://dispatch.ru.is/h14/api/v1/courses/' + $scope.currentCourse + '/20141/evaluations/' + $scope.currentID,
                    $scope.param.token, $scope.ansArray)
                .success(function(){
                    $route.reload();
                });

        };
}]);