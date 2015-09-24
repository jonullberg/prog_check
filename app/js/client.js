'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');
require('angular-bootstrap');
require('ng-file-upload');

var progCheck = angular.module('progCheck', ['ngRoute', 'ngCookies', 'base64', 'ui.bootstrap', 'ngFileUpload']);

//  services
require('./services/rest_resource')(progCheck);
require('./services/copy')(progCheck);
require('./standards/services/pc_grades_service')(progCheck);
require('./services/lodash')(progCheck);
require('./services/us_states')(progCheck);
require('./services/sanitize_fractions')(progCheck);
require('./services/shuffle')(progCheck);
require('./services/to_trusted')(progCheck);

//    Auth Services
require('./auth/services/token_interceptor')(progCheck);
require('./auth/services/user_service')(progCheck);
require('./auth/services/authentication_service')(progCheck);

//    Data Services

  //  Teacher Data
  require('./teachers/services/teacher_data')(progCheck);
  require('./teachers/services/attempt_data')(progCheck);

require('./services/errors_service')(progCheck); // Service for holding errors of application
require('./services/test_data')(progCheck); // Stores all test data for app
require('./services/standards_data')(progCheck); // Stores all standard data for app
require('./teachers/services/students_data')(progCheck); // Stores all student data on client for teacher user
require('./students/services/student_data')(progCheck); // Stores all data for a single student

//  controllers
require('./controllers/errors_controller')(progCheck);
require('./controllers/footer_controller')(progCheck);
require('./controllers/bug_form_controller')(progCheck);
require('./controllers/main_controller')(progCheck);

//    Auth Controllers
require('./auth/controllers/student_auth_controller')(progCheck);
require('./auth/controllers/auth_controller')(progCheck);
require('./auth/controllers/account_tools_controller')(progCheck);
require('./controllers/terms_controller')(progCheck);

//    Standard Controllers
require('./standards/controllers/standards_controller')(progCheck);

//    Student Controllers
require('./students/controllers/student_home_controller')(progCheck);
require('./students/controllers/student_tests_controller')(progCheck);

//    Teacher Controllers
require('./teachers/controllers/teachers_controller')(progCheck);
require('./teachers/controllers/student_form_controller')(progCheck);
require('./teachers/controllers/single_student_controller')(progCheck);
require('./teachers/controllers/students_list_controller')(progCheck);

//    Test Controllers
require('./tests/controllers/test_controller')(progCheck);
require('./tests/controllers/tests_list_controller')(progCheck);
require('./tests/controllers/test_form_controller')(progCheck);
require('./tests/controllers/add_test_form_controller')(progCheck);
require('./tests/controllers/edit_test_form_controller')(progCheck);
require('./tests/controllers/single_test_controller')(progCheck);
require('./tests/controllers/question_controller')(progCheck);


//  directives
require('./directives/pc_errors_directive')(progCheck);
require('./auth/directives/sign_up_directive')(progCheck);
require('./directives/header_directive')(progCheck);
require('./directives/pc_footer_directive')(progCheck);
require('./auth/directives/account_tools_directive')(progCheck);
require('./teachers/directives/pc_teachers_directive')(progCheck);
require('./directives/valid_password')(progCheck);
require('./directives/compare_password')(progCheck);

  //  Test directives
require('./tests/directives/pc_test_form')(progCheck);  // Form for adding or editing tests
require('./tests/directives/pc_question_form')(progCheck);  // Ability to add questions
require('./tests/directives/pc_tests_list')(progCheck); // Shows a list of all tests attached to standard
require('./tests/directives/pc_single_test')(progCheck); // Shows the information for a single test

//  Anonymous

  //  Controllers

  //  Directives


//  Admin

  //  Controllers

  //  Standards

    //  Standards List
    require('./standards/directives/pc_standards_list')(progCheck); // Directive
    require('./standards/controllers/standards_list_controller')(progCheck); // Controller
    require('./standards/modals/controllers/standards_list_modal_controller')(progCheck); //  Modal Controller

    //  Single Standards
    require('./standards/directives/pc_single_standard')(progCheck);  //  Directive
    require('./standards/controllers/single_standard_controller')(progCheck); //  Controller
    require('./standards/modals/controllers/single_standard_modal_controller')(progCheck);  //  Modal Controller

    //  Standard Form
    require('./standards/directives/pc_standard_form_directive')(progCheck);  //  Directive
    require('./standards/controllers/standard_form_controller')(progCheck); //  Controller

    //  Goal Form
    require('./standards/directives/pc_goal_form_directive')(progCheck);  //  Directive
    require('./standards/controllers/goal_form_controller')(progCheck); //  Controller




//  Teacher

  //  Controllers

  //  Directives



//  Students

  //  Test
  require('./students/controllers/test_controller')(progCheck);

  //  Questions
  require('./students/controllers/question_controller')(progCheck);
  require('./students/directives/pc_question_directive')(progCheck);

  //  Attempt Review
  require('./students/controllers/attempt_review_controller')(progCheck);

//  Configuration
require('./config/routes')(progCheck);

