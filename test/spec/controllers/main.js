'use strict';

//describe('MainCtrl login', function () {
//
//    // load the controller's module
//    beforeEach(module('projectRestApp'));
//
//    var MainCtrl,
//        scope;
//
//    var fakechat = {
//        loginUser: function(userPass) {
//            return userPass === {user: 'gunnars09', pass: '12345'};
//        },
//        getTokenData: function(){
//            return {Token: 'token', fullName: 'Gunnar Stefansson'};
//        }
//    };
//
//    // Initialize the controller and a mock scope
//    beforeEach(inject(function ($controller, $rootScope) {
//        scope = $rootScope.$new();
//        MainCtrl = $controller('MainCtrl', {
//            $scope: scope,
//            BackEnd: fakechat
//          });
//
//      }));
//
//    it('should send a log in request and return token and fullname', function () {
//        var user = {user: 'gunnars09', pass: '12345'};
//        scope.usr = user;
//        MainCtrl.loginUsr();
//        expect(fakechat. getTokenData)
//            .toHaveBeenCalledWith(user);
//
//      });
//  });
