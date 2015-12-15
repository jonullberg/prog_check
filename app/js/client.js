(function() {
  'use strict';

  require('angular/angular');
  require('angular-route');
  require('angular-cookies');
  require('angular-base64');
  require('angular-ui-bootstrap');
  require('angular-jwt');
  require('ng-file-upload');

  var progCheck = angular.module('progCheck', [
    'ngRoute',
    'ngCookies',
    'angular-jwt',
    'base64',
    'ui.bootstrap',
    'ngFileUpload'
    ]);


  //  Configuration
  require('./config/routes');
  require('./config/config');

  //  services
  require('./services/copy.service');
  require('./services/grades.service');
  require('./services/us_states')(progCheck);
  require('./services/sanitize_fractions')(progCheck);
  require('./services/shuffle.service');
  require('./services/to_trusted')(progCheck);
  require('./services/stacktrace.service.js')(progCheck);
  require('./services/error-log.service.js')(progCheck);
  require('./services/errors.service');

  // Auth Services


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

  //  directives
  require('./directives/header_directive')(progCheck);
  require('./directives/pc_footer_directive')(progCheck);
  require('./auth/directives/account_tools_directive')(progCheck);
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
    //  Data Services
    require('./admin/data-services/admin.data.service')(progCheck);
    require('./admin/data-services/admin.standards.data')(progCheck);
    require('./admin/data-services/admin.tests.data')(progCheck);
    require('./admin/data-services/admin.teachers.data')(progCheck);

    //  Standards List
    require('./admin/standards-list/admin.standards-list.directive')(progCheck);
    require('./admin/standards-list/admin.standards-list.controller')(progCheck);

    //  Single Standards
    require('./admin/single-standard/admin.single-standard.directive')(progCheck);  //  Directive
    require('./admin/single-standard/admin.single-standard.controller'); //  Controller

    //  Standard Form
    require('./admin/standard-form/admin.standard-form.directive')(progCheck);  //  Directive
    require('./admin/standard-form/admin.standard-form.controller'); //  Controller

    //  Goal Form
    require('./admin/goal-form/admin.goal-form.directive');
    require('./admin/goal-form/admin.goal-form.controller');

    //  Single Test
    require('./admin/single-test/admin.single-test.directive')(progCheck);
    require('./admin/single-test/admin.single-test.controller')(progCheck);

    //  Tests List
    require('./admin/tests-list/admin.tests-list.directive')(progCheck);
    require('./admin/tests-list/admin.tests-list.controller')(progCheck);

    //  Test Create Form
    require('./admin/test-form/admin.test-form.directive')(progCheck);
    require('./admin/test-form/admin.test-form.controller')(progCheck);

    //  Question Form
    require('./admin/question-form/admin.question-form.directive');
    require('./admin/question-form/admin.question-form.controller');
    require('./admin/question-form/admin.image-question-form.controller');

    // Teachers List
    require('./admin/teachers-list/admin.teachers-list.controller')(progCheck);

    // Miscellaneous
      // TODO: Refactor these controllers
      // require('./admin/controllers/test_controller')(progCheck);
      // require('./admin/controllers/add_test_form_controller')(progCheck);
      // require('./admin/controllers/edit_test_form_controller')(progCheck);

  //  Teacher
    //  Data Services
    require('./teacher/data-services/teacher.data.service')(progCheck);
    require('./teacher/data-services/teacher.students.data')(progCheck);
    require('./teacher/data-services/teacher.attempts.data')(progCheck);
    require('./teacher/data-services/teacher.standards.data')(progCheck);

    // Goal Progress Report
    require('./teacher/goal-progress-report/teacher.goal-progress-report.directive')(progCheck);
    require('./teacher/goal-progress-report/teacher.goal-progress-report.controller')(progCheck);

    // Single Standard
    require('./teacher/single-standard/teacher.single-standard-modal.controller')(progCheck);  //  Modal Controller

    // Single Student
    require('./teacher/single-student/teacher.single-student.controller')(progCheck);

    // Standards List
    require('./teacher/standards-list/teacher.standards-list-modal.controller')(progCheck);

    //  Student Attempts
    require('./teacher/student-attempts/teacher.student-attempts.directive')(progCheck);
    require('./teacher/student-attempts/teacher.student-attempts.controller')(progCheck);

    // Student Form
    require('./teacher/student-form/teacher.student-form.controller')(progCheck);

    //  Student Goals List Directive
    require('./teacher/student-goals-list/teacher.student-goals-list.controller')(progCheck);
    require('./teacher/student-goals-list/teacher.student-goals-list.directive')(progCheck);

    //  Student Goal Settings
    require('./teacher/student-goal-settings/teacher.student-goal-settings.controller')(progCheck);

    // Students List
    require('./teacher/students-list/teacher.students-list.controller')(progCheck);


  //  Students
    //  Data Services
    require('./student/data-services/student.data.service')(progCheck);
    require('./student/data-services/student.test.data')(progCheck);

    //  Attempt Review
    require('./student/attempt-review/student.attempt-review.controller')(progCheck);

    //  Questions
    require('./student/question/student.question.controller')(progCheck);
    require('./student/question/student.question.directive')(progCheck);

    //  Test
    require('./student/test/student.test.controller')(progCheck);

    // Tests List
    require('./student/tests-list/student.tests-list.controller')(progCheck);
    require('./student/tests-list/student.tests-list.controller')(progCheck);

})();

