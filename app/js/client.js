'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');
require('angular-bootstrap');

var progCheck = angular.module('progCheck', ['ngRoute', 'ngCookies', 'base64', 'ui.bootstrap']);

//  services
require('./auth/services/user_service')(progCheck);
require('./services/rest_resource')(progCheck);
require('./services/copy')(progCheck);
require('./services/data_service')(progCheck);
require('./standards/services/pc_grades_service')(progCheck);
require('./services/lodash')(progCheck);
require('./auth/services/authentication_service')(progCheck);
require('./services/us_states')(progCheck);
require('./auth/services/token_interceptor')(progCheck);

//  controllers
require('./auth/controllers/auth_controller')(progCheck);
require('./controllers/main_controller')(progCheck);
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

//  Configuration
require('./config/routes')(progCheck);
