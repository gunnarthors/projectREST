'use strict';

angular.module('projectRestApp.factory', [])
    .factory('UserFactory', [function() {
        var userData = {};
        return {
            setUserFullName: function(name) {
                userData.fullName = name;
            },
            getUserFullName: function() {
                return userData.fullName;
            },
            setUsername: function(name) {
                userData.username = name;
            },
            getUsername: function() {
                return userData.username;
            },
            setUserSSN: function(SSN) {
                userData.SSN = SSN;
            },
            getUserSSN: function() {
                return userData.SSN;
            }
        };




    }]);
/*
angular.module('projectRestApp.service', [])
    .factory('UserData',[function($http){
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
*/
/*
projectRestApp.service('UserService', function() {
    this.user = function() {
        return this.userData;
    };

    this.setUserFullName = function(name) {
        this.userData.name = name;
    };

    this.getUserFullName = function() {
        return this.userData.name;
    };


});
*/
