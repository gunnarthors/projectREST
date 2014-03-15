'use strict';

angular.module('projectRestApp')
    .controller('CreateCtrl',['$scope', 'BackEnd', '$route', '$location', '$log', '$modal',
        function ($scope, BackEnd, $route, $location, $log, $modal) {
        $scope.isCollapsed = false;
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
            console.log($scope.evalObject);
        };
        $scope.addTeacherQuestion = function() {
            $scope.output = $scope.question;
            $scope.evalObject.TeacherQuestions.push($scope.question);
            $scope.reset();
            console.log($scope.evalObject);
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


         $scope.ModalDemoCtrl = function ($scope, $modal, $log) {

            $scope.items = ['item1', 'item2', 'item3'];

            $scope.open = function () {

                $scope.modalInstance = $modal.open({
                    templateUrl: 'views/create.html',
                    controller: $scope.ModalInstanceCtrl,
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });

                $scope.modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
        };




        $scope.ModalInstanceCtrl = function ($scope, $modalInstance) {

            $scope.items = 'blessaður';
            $scope.selected = {
                item: $scope.items
            };

            $scope.ok = function () {
                $modalInstance.close($scope.selected.item);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };






    }]);
