'use strict';

angular.module('projectRestApp.StudentCtrl', [])
    .controller('StudentCtrl',['$scope', 'BackEnd', function ($scope, BackEnd) {
        $scope.temp = 'Hello';

//        var base = BackEnd.all('my/courses');
//        base.get();
//        console.log(base);

}]);