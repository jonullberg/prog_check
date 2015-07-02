'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');
require('angular-bootstrap');

var progCheck = angular.module('progCheck', ['ngRoute', 'ngCookies', 'base64', 'ui.bootstrap']);

//  services
require('./auth/services/auth_service')(progCheck);
require('./services/rest_resource.js')(progCheck);
require('./services/copy.js')(progCheck);
require('./services/data_service.js')(progCheck);

//  controllers
require('./auth/controllers/auth_controller')(progCheck);
require('./controllers/dashboard_controller')(progCheck);
require('./standards/controllers/standards_controller')(progCheck);
require('./tests/controllers/test_controller')(progCheck);

//  directives
require('./auth/directives/sign_up_directive')(progCheck);
require('./directives/header_directive')(progCheck);
require('./auth/directives/account_tools_directive')(progCheck);
require('./standards/directives/pc_standards_directive')(progCheck);
require('./standards/directives/pc_standard_form_directive')(progCheck);
require('./teachers/directives/pc_teachers_directive')(progCheck);
require('./tests/directives/pc_test_form')(progCheck);
require('./tests/directives/pc_question_form')(progCheck);

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
    .when('/about', {
      templateUrl: 'templates/views/about.html'
      // No controller needed as of now
    })
    .when('/pricing', {
      templateUrl: 'templates/views/pricing.html'
      // No controller needed as of now
    })
    .when('/home', {
      templateUrl: 'templates/views/home.html'
      // No controller needed as of now
    })
    .when('/dashboard', {
      templateUrl: 'templates/views/dashboard.html',
      controller: 'dashboardController'
    })
    .otherwise({
      redirectTo: '/sign-up'
    });
}]);
