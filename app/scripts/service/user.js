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
            },
            setUserToken: function(Token) {
                userData.token = Token;
            },
            getUserToken: function() {
                return userData.token;
            }
        };




    }]);

