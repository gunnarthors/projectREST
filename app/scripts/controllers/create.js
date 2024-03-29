'use strict';

angular.module('projectRestApp.CreateCtrl', [])
    .controller('CreateCtrl',['$scope', 'BackEnd', '$location', 'UserFactory',
        function ($scope, BackEnd, $location, UserFactory) {
        $scope.isCollapsed = false;
        $scope.token = UserFactory.getUserToken();
        $scope.head = true;
        $scope.rows = false;
        $scope.teacher = false;
        $scope.course = false;

        $scope.evalObject = {};

        $scope.evalDescript = function(){
            $scope.evalObject.TitleEN = $scope.title;
            $scope.evalObject.IntroTextEN = $scope.description;
            $scope.evalObject.TitleIS = 'ISL';
            $scope.evalObject.IntroTextIS = 'ISL';
            $scope.evalObject.CourseQuestions = [];
            $scope.evalObject.TeacherQuestions = [];
            $scope.rows = true;
        };

        $scope.question = {};
        $scope.question.Answers = [{TextIS: '', TextEN:'', ImageURL: '', Weight: ''},
            {TextIS: '', TextEN:'', ImageURL: '', Weight: ''}];

        $scope.reset = function() {
            $scope.question = {};
            $scope.question.Answers = [{TextIS: '', TextEN:'', ImageURL: '', Weight: ''},
                {TextIS: '', TextEN:'', ImageURL: '', Weight: ''}];
        };
        $scope.addChoice = function() {
            $scope.question.Answers.push({TextIS: '', TextEN:'', ImageURL: '', Weight: ''});
        };

        $scope.multi = function() {
            $scope.question.Type = 'multi';
        };

        $scope.text = function() {
                $scope.question.Type = 'text';
            };
//        $scope.show = function() {
//            if($scope.evalObject.CourseQuestions.Type === 'text') {
//                console.log();
//                $scope.multi = false;
//                $scope.text = true;
//            }
//            if($scope.evalObject.CourseQuestions.Type === 'multi') {
//                $scope.multi = true;
//                $scope.text = false;
//            }
//        };
        $scope.addCourseQuestion = function() {
            $scope.evalObject.CourseQuestions.push($scope.question);
            $scope.reset();

        };
        $scope.addTeacherQuestion = function() {
            $scope.output = $scope.question;
            console.log(  $scope.evalObject.TeacherQuestions);
            $scope.evalObject.TeacherQuestions.push($scope.question);
            $scope.reset();
        };
        $scope.saveTemplate = function() {
            console.log($scope.evalObject);
            BackEnd.authPOST('POST', 'http://dispatch.ru.is/h14/api/v1/evaluationtemplates', $scope.token, $scope.evalObject)
                .success(function() {
                    $scope.success = 'Your template has been saved successfully! You will be directed home.';
                    $location.path('/admin/' + $scope.token);
                });
        };
    }]);
