'use strict';

require('angular/angular');

var progCheck = angular.module('progCheck', []);

//  services

//  controllers
require('./auth/controllers/auth_controller')(progCheck);

//  directives
require('./auth/directives/sign_up_directive')(progCheck);
require('./auth/directives/display_user_directive')(progCheck);

progCheck.config(['$routeProvider', function($routeProvider) {
  $routeProvider

    .when('sign-up', {
      templateUrl: 'templates/views/auth.html',
      controller: 'authController'
    })
    .when('/sign-in', {
      templateUrl: 'templates/views/auth.html',
      controller: 'authController'
    });
}]);
