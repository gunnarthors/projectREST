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



        // date picker
        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.showWeeks = true;
        $scope.toggleWeeks = function () {
            $scope.showWeeks = ! $scope.showWeeks;
        };

        $scope.clear = function () {
            $scope.dt = null;
        };

        $scope.disabled = function() {
            if($scope.check === true){
                $scope.startDate = $scope.formatDate($scope.dt);
            }
            else if($scope.check === false){
                $scope.endDate = $scope.formatDate($scope.dt);
            }

        };

        $scope.toggleMin = function() {
            $scope.minDate = ( $scope.minDate ) ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event, check) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
            $scope.check = check;
        };

        $scope.dateOptions = {
            'year-format': 'yy',
            'starting-day': 1
        };

        $scope.formats = ['yyyy/MM/dd'];
        $scope.format = $scope.formats[0];

        $scope.formatDate = function(date){
            var year = date.getFullYear().toString();
            var month = (date.getMonth()+1).toString();
            if(month.length === 1) {
                month = '0' + month;
            }
            var day = date.getDate().toString();
            if(day.length === 1) {
                day = '0' + day;
            }
            return year + '-' + month + '-' + day;
        };

}]);