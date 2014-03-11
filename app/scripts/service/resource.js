'use strict';

angular.module('projectRestApp.service', [])
    .factory('BackEnd', function(Restangular) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('http://project3api.haukurhaf.net/api/v1/');
        });
    });
