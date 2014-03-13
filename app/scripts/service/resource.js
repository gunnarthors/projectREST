'use strict';

angular.module('projectRestApp.service', [])
    .factory('BackEnd',['$http', function($http){
        return {
            login: function(usr){
                return $http({
                    method: 'POST',
                    url: 'http://dispatch.ru.is/h14/api/v1/login',
                    data: usr
                });
            },
            authRequest: function(method, url, token){
                return $http({
                    method: method,
                    url: url,
                    headers: {'Authorization': 'Basic ' + token}
                });
            },
            authPOST: function(method, url, token, data){
                return $http({
                    method: method,
                    url: url,
                    headers: {'Authorization': 'Basic ' + token},
                    data: data
                });
            }
        };
    }]);
