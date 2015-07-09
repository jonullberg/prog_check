'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');
require('angular-bootstrap');

var progCheck = angular.module('progCheck', ['ngRoute', 'ngCookies', 'base64', 'ui.bootstrap']);

//  services
require('./auth/services/auth_service')(progCheck);
require('./services/rest_resource')(progCheck);
require('./services/copy')(progCheck);
require('./services/data_service')(progCheck);
require('./standards/services/pc_grades_service')(progCheck);
require('./services/lodash')(progCheck);

//  controllers
require('./auth/controllers/auth_controller')(progCheck);
require('./controllers/dashboard_controller')(progCheck);
require('./standards/controllers/standards_controller')(progCheck);
require('./tests/controllers/test_controller')(progCheck);

//  directives
require('./auth/directives/sign_up_directive')(progCheck);
require('./directives/header_directive')(progCheck);
require('./auth/directives/account_tools_directive')(progCheck);
require('./teachers/directives/pc_teachers_directive')(progCheck);

  //  Standard directives
require('./standards/directives/pc_standards_directive')(progCheck);
require('./standards/directives/pc_standard_form_directive')(progCheck);
require('./standards/directives/pc_single_standard')(progCheck);
require('./standards/directives/pc_standards_list')(progCheck);
require('./standards/directives/pc_goal_form_directive')(progCheck);

  //  Test directives
require('./tests/directives/pc_test_form')(progCheck);  // Form for adding or editing tests
require('./tests/directives/pc_question_form')(progCheck);  // Ability to add questions
require('./tests/directives/pc_tests_list')(progCheck); // Shows a list of all tests attached to standard
require('./tests/directives/pc_single_test')(progCheck); // Shows the information for a single test

progCheck.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/admin/sign-in', {
      templateUrl: 'templates/views/sign-in.html',
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
    .when('/admin/home', {
      templateUrl: 'templates/views/home.html'
      // No controller needed as of now
    })
    .when('/admin/standards', {
      templateUrl: 'templates/directives/standards.html',
      controller: 'standardsController'
    })
    .when('/admin/teachers', {
      templateUrl: '/templates/directives/teachers.html'
      // No controller as of now
    })
    .when('/teacher/sign-up', {
      templateUrl: 'templates/teachers/views/sign-up.html'
      // No controller as of now
    })
    .when('/teacher/sign-in', {
      templateUrl: 'templates/views/sign-in.html'
    })
    .when('/teacher/home', {
      templateUrl: 'templates/teachers/views/home.html'
    })
    .when('/student/sign-in', {
      templateUrl: 'templates/views/sign-in.html'
    })
    .when('/students/home', {
      templateUrl: 'templates/students/views/home.html'
    })
    .otherwise({
      redirectTo: '/home'
    });
}]);

// progCheck.run(['$rootScope', '$location', '_', 'auth', function($rootScope, $location, _, auth) {
//   var routesThatDontRequireAuth = ['/sign-in', '/sign-up', 'about', '/pricing', '/home'];

//   var routeClean = function(route) {
//     return _.find(routesThatDontRequireAuth,
//       function(noAuthRoute) {
//         return _.str.startsWith(route, noAuthRoute);
//       });
//   };

//   $rootScope.$on('$routeChangeStart', function(event, next, current) {
//     if (!routeClean($location.url()) && !auth.isSignedIn()) {
//       $location.path('/sign-in');
//     }
//   });
// }]);
