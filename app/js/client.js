'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');
require('angular-bootstrap');
// require('jQuery');

var progCheck = angular.module('progCheck', ['ngRoute', 'ngCookies', 'base64', 'ui.bootstrap']);

//  services

//  controllers
require('./auth/controllers/auth_controller')(progCheck);

//  directives
require('./auth/directives/sign_up_directive')(progCheck);
require('./directives/header_directive')(progCheck);

progCheck.config(['$routeProvider', function($routeProvider) {
  $routeProvider

    .when('/sign-up', {
      templateUrl: 'templates/views/auth.html',
      controller: 'authController'
    })
    .when('/sign-in', {
      templateUrl: 'templates/views/auth.html',
      controller: 'authController'
    })
    .otherwise({
      redirectTo: '/sign-up'
    });
}]);
