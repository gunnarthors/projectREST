'use strict';

angular.module('projectRestApp.service', [])
    .factory('BackEnd',['$http', function($http){
        return {
            login: function(usr){
                return $http({
                    method: 'POST',
                    url: 'http://project3api.haukurhaf.net/api/v1/login',
                    data: usr
                });
            },
            authRequest: function(method, url, token){
                return $http({
                    method: method,
                    url: url,
                    headers: {'Authorization': 'Basic ' + token}
                });
            }
        };
    }]);

//    .factory('BackEnd', function(Restangular) {
//        return Restangular.withConfig(function(RestangularConfigurer) {
//            RestangularConfigurer.setBaseUrl('http://project3api.haukurhaf.net/api/v1/');
//        });
//    });
//    .factory('BackEnd',['$resource', function($resource) {
//        var baseUrl = 'http://project3api.haukurhaf.net/api/v1/';
//        var userObject = {};
//        return {
//            'login': function(usr){
//                var base = $resource(baseUrl + 'login');
//
//                return base.save(usr, function(data) {
//                    if(data.$resolve === true) {
//                        userObject = data.User;
//                        return data;
//                    }
//                    else {
//                        return { Error: 'NOOB!!!' };
//                    }
//                });
//
//            }
//        };
//    }]);

//.service('BackEnd', ['$http', function($http){
//    var baseUrl = 'http://project3api.haukurhaf.net/api/v1/';
//    var userObject = {};
//
//    this.login = function() {
//
//    }
//}]);