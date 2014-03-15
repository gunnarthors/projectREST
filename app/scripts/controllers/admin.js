'use strict';

angular.module('projectRestApp')
    .controller('AdminCtrl',['$scope', '$route', 'BackEnd', '$location', '$modal', '$log', function ($scope, $route, BackEnd, $location, $modal, $log) {
        $scope.param = $route.current.params;
        $scope.token = $scope.param.token;
//        $scope.publicSuccess = false;
//        $scope.publicErr = false;

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
                $scope.templates = data;
            })
            .error(function(status){
                $scope.Eerror = status;
            });

        // Get and show selected template
        $scope.openTemp = function(tempid){
            $scope.ID = tempid;
            BackEnd.authRequest('GET', 'http://dispatch.ru.is/h14/api/v1/evaluationtemplates/'+ tempid, $scope.token)
            .success(function(data){
                $scope.evalTemp = data;
                $scope.currID = tempid;
                $scope.showTemp = true;
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

        $scope.formatDate = function(date) {
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

        $scope.time = '';
        // modal stuff
        $scope.openTime = function () {

            var modalInstance = $modal.open({
                templateUrl: 'modalTime.html',
                controller: ModalInstanceCtrl,
                resolve: {
                    time: function () {
                        return $scope.time;
                    }
                }
            });

            modalInstance.result.then(function(time) {
                $scope.time = time;
                if($scope.check === true){
                    $scope.startDate = $scope.startDate + 'T' + $scope.time;
                }
                else if($scope.check === false){
                    $scope.endDate = $scope.endDate + 'T' + $scope.time;
                }
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        var ModalInstanceCtrl = function ($scope, $modalInstance, time) {

            $scope.time = time;
            $scope.mytime = new Date();
            $scope.hstep = 1;
            $scope.mstep = 1;

            $scope.ismeridian = true;
            $scope.toggleMode = function() {
                $scope.ismeridian = ! $scope.ismeridian;
            };

            $scope.update = function(hour, min) {
                var d = new Date();
                d.setHours(hour);
                d.setMinutes(min);
                $scope.mytime = d;
            };

            $scope.formatTime = function(time) {
                var hour = time.getHours().toString();
                var min = time.getMinutes().toString();
                var sec = time.getSeconds().toString();
                if(hour.length === 1){
                    hour = '0' + hour;
                }
                if(min.length === 1){
                    min = '0' + min;
                }
                if(sec.length === 1){
                    sec = '0' + sec;
                }
                return hour + ':' + min + ':' + sec;
            };

            $scope.ok = function (mytime) {
                $scope.time = $scope.formatTime(mytime);
                $modalInstance.close($scope.time);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };

        $scope.makePublic = function(){
            if($scope.currID === 'undefined'){
                console.log('No Template id selected.. weird!.. select template again and try again!');
            }
            else{
                var dataobj = {
                    TemplateID: $scope.currID,
                    StartDate: $scope.startDate,
                    EndDate: $scope.endDate
                };
                BackEnd.authPOST('POST', 'http://dispatch.ru.is/h14/api/v1/evaluations',
                    $scope.token, dataobj)
                    .success(function(){
                        console.log('Successfully deployed evaluation ID: ' + $scope.currID + ' Start datetime: ' + $scope.startDate +
                            ' End datetime: ' + $scope.endDate);
                        $route.reload();
                    })
                    .error(function(){
                        $scope.publicErr = true;
                        console.log('Evaluation was not deployed... Something went wrong!');
                    });
            }
        };
}]);