'use strict';

require('angular/angular');

var progCheck = angular.module('progCheck', []);

//  services

//  controllers

//  directives
require('./auth/directives/display_user_directive')(progCheck);

// progCheck.config(['$routeProvider', function($routeProvider) {
//   $routeProvider
//     .when('/', {
//       templateUrl: 'templates/views/auth.html',
//       controller: 'authController'
//     });
// }]);
