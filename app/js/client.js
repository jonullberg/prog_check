'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');
require('angular-ui-bootstrap');
require('angular-jwt');
require('ng-file-upload');

var progCheck = angular.module('progCheck', ['ngRoute', 'ngCookies', 'angular-jwt', 'base64', 'ui.bootstrap', 'ngFileUpload']);

//  Configuration
require('./config/routes')(progCheck);

//  services
require('./services/rest_resource')(progCheck);
require('./services/copy')(progCheck);
require('./services/pc_grades_service')(progCheck);
require('./services/lodash')(progCheck);
require('./services/us_states')(progCheck);
require('./services/sanitize_fractions')(progCheck);
require('./services/shuffle')(progCheck);
require('./services/to_trusted')(progCheck);

//    Auth Services



require('./services/errors_service')(progCheck); // Service for holding errors of application
require('./services/test_data')(progCheck); // Stores all test data for app
require('./services/standards_data')(progCheck); // Stores all standard data for app

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
require('./auth/controllers/forgot_password_controller')(progCheck);
require('./auth/controllers/reset_password_controller')(progCheck);

//    Standard Controllers
require('./admin/controllers/standards_controller')(progCheck);

//    Student Controllers
require('./students/controllers/student_home_controller')(progCheck);
require('./students/controllers/student_tests_controller')(progCheck);

//    Teacher Controllers

//    Test Controllers


//  directives
require('./directives/header_directive')(progCheck);
require('./directives/pc_footer_directive')(progCheck);
require('./auth/directives/account_tools_directive')(progCheck);
require('./teachers/directives/pc_teachers_directive')(progCheck);
require('./directives/convert_to_number')(progCheck);

  //  Test directives

//  Global
  //  Authentication
  require('./directives/valid_password')(progCheck);
  require('./directives/compare_password')(progCheck);
  require('./auth/directives/sign_up_directive')(progCheck);
  require('./auth/services/token_interceptor')(progCheck);
  require('./auth/services/user_service')(progCheck);
  require('./auth/services/authentication_service')(progCheck);

  //  Error Reporting
  require('./directives/pc_errors_directive')(progCheck);


//  Admin
  //  Data
  require('./admin/data_services/admin_data_service')(progCheck);
  require('./admin/data_services/admin_standards_data')(progCheck);
  require('./admin/data_services/admin_tests_data')(progCheck);
  require('./admin/data_services/admin_teachers_data')(progCheck);

  //  Standards
    //  Standards List
    require('./admin/directives/pc_standards_list')(progCheck);
    require('./admin/controllers/standards_list_controller')(progCheck);
    require('./admin/modals/controllers/standards_list_modal_controller')(progCheck);

    //  Single Standards
    require('./admin/directives/pc_single_standard')(progCheck);  //  Directive
    require('./admin/controllers/single_standard_controller')(progCheck); //  Controller
    require('./admin/modals/controllers/single_standard_modal_controller')(progCheck);  //  Modal Controller

    //  Standard Form
    require('./admin/directives/pc_standard_form_directive')(progCheck);  //  Directive
    require('./admin/controllers/standard_form_controller')(progCheck); //  Controller

    //  Goal Form
    require('./admin/directives/pc_goal_form_directive')(progCheck);
    require('./admin/controllers/goal_form_controller')(progCheck);

  // Tests
    //  Single Test
    require('./admin/directives/pc_single_test')(progCheck);
    require('./admin/controllers/single_test_controller')(progCheck);

    //  Tests List
    require('./admin/directives/pc_tests_list')(progCheck);
    require('./admin/controllers/tests_list_controller')(progCheck);

    //  Test Create Form
    require('./admin/directives/pc_test_form')(progCheck);
    require('./admin/controllers/test_form_controller')(progCheck);

    //  Question Form
    require('./admin/directives/pc_question_form')(progCheck);
    require('./admin/controllers/question_form_controller')(progCheck);
    require('./admin/controllers/image_question_form_controller')(progCheck);

  // Teachers
    // Teachers List
    require('./admin/controllers/admin_teachers_list_controller/admin_teachers_list_controller')(progCheck);

  // Miscellaneous
    // TODO: Refactor these controllers
    require('./admin/controllers/test_controller')(progCheck);
    require('./admin/controllers/add_test_form_controller')(progCheck);
    require('./admin/controllers/edit_test_form_controller')(progCheck);

//  Teacher
  //  Data Services
  require('./teachers/data_services/teacher_data_service')(progCheck);
  require('./teachers/data_services/teacher_students_data')(progCheck);
  require('./teachers/data_services/teacher_attempts_data')(progCheck);
  require('./teachers/data_services/teacher_standards_data')(progCheck);

  require('./teachers/controllers/teachers_controller')(progCheck);
  require('./teachers/controllers/student_form_controller')(progCheck);
  require('./teachers/controllers/single_student_controller')(progCheck);
  require('./teachers/controllers/students_list_controller')(progCheck);

  //  Student Goals List Directive
  require('./teachers/controllers/student_goals_list_controller')(progCheck);
  require('./teachers/directives/pc_student_goals_list')(progCheck);

  //  Student Goal Settings
  require('./teachers/controllers/student_goal_settings_controller')(progCheck);

  //  Student Attempts
  require('./teachers/directives/pc_student_attempts_directive')(progCheck);
  require('./teachers/controllers/student_attempts_controller')(progCheck);

  // Student Progress Report
  require('./teachers/directives/pc-attempt-progress-report')(progCheck);
  require('./teachers/controllers/progress_report/progress_report_controller')(progCheck);

//  Students
  //  Data
  require('./students/data_services/student_data_service')(progCheck);
  require('./students/data_services/student_test_data')(progCheck);

  //  Test
  require('./students/controllers/student_test_controller')(progCheck);

  //  Questions
  require('./students/controllers/question_controller')(progCheck);
  require('./students/directives/pc_question_directive')(progCheck);

  //  Attempt Review
  require('./students/controllers/attempt_review_controller')(progCheck);


