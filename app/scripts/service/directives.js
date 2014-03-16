'use strict';
angular.module('projectRestApp.directive', [])
    .controller('ImgCtrl', function($scope) {
        $scope.rand = Math.floor(Math.random() * 7);
        console.log($scope.rand);
        $scope.imgArr = [
            {
                imgURL: 'http://www.geeksofdoom.com/GoD/img/2013/06/2013-06-27-ninja_turtles_leonardo-e1372331128667.jpg'
            },
            {
                imgURL: 'http://www.renderat.com/renders/Spiderman3.png'
            },
            {
                imgURL: 'http://th01.deviantart.net/fs70/PRE/i/2013/135/5/f/iron_man_by_rapsag-d65d74d.jpg'
            },
            {
                imgURL: 'http://static1.businessinsider.com/image/526478b5eab8ea2b7f0036a7/this-trailer-for-batman-video-game-arkham-origins-will-pull-at-your-heartstrings.jpg'
            },
            {
                imgURL: 'http://www.morningcomics.com/wp-content/uploads/sites/4/2013/12/hulk-is-green.jpg'
            },
            {
                imgURL: 'http://fc07.deviantart.net/fs71/i/2011/310/6/0/ninja_hello_kitty_by_plaidguy86-d4faf9n.png'
            },
            {
                imgURL: 'http://img2.wikia.nocookie.net/__cb20120922002941/fantendo/images/f/fc/MarioNSMBWii.png'
            }

        ];
    })
    .directive('myImage', function() {
        return{
            template: '<img src="{{imgArr[rand].imgURL}}" heigth="140" width="110" alt="student">'
        };
    });





