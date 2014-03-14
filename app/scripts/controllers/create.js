'use strict';

angular.module('projectRestApp')
    .controller('CreateCtrl',['$scope', 'BackEnd', '$route', '$location', function ($scope, BackEnd, $route, $location) {
        $scope.param = $route.current.params;
        $scope.token = $scope.param.token;
        $scope.head = true;
        $scope.rows = false;

        $scope.evalObject = {};

        $scope.evalDescript = function(){
            $scope.evalObject.TitleEN = $scope.title;
            $scope.evalObject.IntroTextEN = $scope.description;
            $scope.evalObject.TitleIS = 'doo';
            $scope.evalObject.IntroTextIS = 'scoopy';
            $scope.evalObject.CourseQuestions = [];
            $scope.evalObject.TeacherQuestions = [];
            $scope.rows = true;
            console.log($scope.evalObject);
        };

        $scope.question = {};
        $scope.question.Answers = [{TextIS: '', TextEN:'', ImageURL: '', Weight: ''},
            {TextIS: '', TextEN:'', ImageURL: '', Weight: ''}];
        $scope.addChoice = function() {
            $scope.question.Answers.push({TextIS: '', TextEN:'', ImageURL: '', Weight: ''});
            console.log($scope.question);
        };

        $scope.addCourseQuestion = function() {
            $scope.evalObject.CourseQuestions.push($scope.question);
            $scope.question = {};
            $scope.question.Answers = [{TextIS: '', TextEN:'', ImageURL: '', Weight: ''},
                {TextIS: '', TextEN:'', ImageURL: '', Weight: ''}];
            console.log($scope.evalObject);
        };
        $scope.addTeacherQuestion = function() {
            $scope.evalObject.TeacherQuestions.push($scope.question);
            $scope.question = {};
            $scope.question.Answers = [{TextIS: '', TextEN:'', ImageURL: '', Weight: ''},
                {TextIS: '', TextEN:'', ImageURL: '', Weight: ''}];
        };
        $scope.saveTemplate = function() {
            BackEnd.authPOST('POST', 'http://dispatch.ru.is/h14/api/v1/evaluationtemplates', $scope.token, $scope.evalObject)
                .success(function() {
                    $scope.success = 'Your template has been saved successfully! You will be directed home.';
                    $location.path('/admin/' + $scope.token);
                });
//                .error(function(status) {
//                    $scope.error.status = status;
//                });
        };
    }]);
