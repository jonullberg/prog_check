(function() {
  'use strict';

  require('angular/angular');
  require('angular-route');
  require('angular-cookies');
  require('angular-base64');
  require('angular-ui-bootstrap');
  require('angular-jwt');
  require('ng-file-upload');

  angular.module('progCheck', [
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
  require('./services/us-states.service');
  require('./services/sanitize-fractions.service');
  require('./services/shuffle.service');
  require('./services/to-trusted.filter');
  require('./services/stacktrace.service.js');
  require('./services/error-log.service.js');
  require('./services/errors.service');

  // Auth Services


  //  controllers
  require('./controllers/errors.controller');
  require('./controllers/footer.controller');
  require('./controllers/bug-form.controller');
  require('./controllers/main.controller');

  //    Auth Controllers
  require('./auth/controllers/student-auth.controller');
  require('./auth/controllers/auth.controller');
  require('./auth/controllers/account-tools.controller');
  require('./controllers/terms.controller');
  require('./auth/controllers/forgot-password.controller');
  require('./auth/controllers/reset-password.controller');

  //    Standard Controllers
  require('./admin/controllers/admin.standards.controller');

  //  directives
  require('./directives/header.directive');
  require('./directives/footer.directive');
  require('./auth/directives/account-tools.directive');
  require('./directives/convert-to-number.directive');
  require('./directives/delete-alert.directive');
  require('./directives/data-loading.directive');

    //  Test directives

  //  Global
    //  Authentication
    require('./directives/valid-password.directive');
    require('./directives/compare-password.directive');
    require('./auth/directives/sign-up.directive');
    require('./auth/services/token-interceptor.service');
    require('./auth/services/user.service');
    require('./auth/services/authentication.service');
    require('./services/clear-data.service');

    //  Error Reporting
    require('./directives/errors.directive');


  //  Admin
    //  Data Services
    require('./admin/data-services/admin.data.service');
    require('./admin/data-services/admin.standards.data');
    require('./admin/data-services/admin.tests.data');
    require('./admin/data-services/admin.teachers.data');

    //  Standards List
    require('./admin/standards-list/admin.standards-list.directive');
    require('./admin/standards-list/admin.standards-list.controller');

    //  Single Standards
    require('./admin/single-standard/admin.single-standard.directive');  //  Directive
    require('./admin/single-standard/admin.single-standard.controller'); //  Controller

    //  Standard Form
    require('./admin/standard-form/admin.standard-form.directive');  //  Directive
    require('./admin/standard-form/admin.standard-form.controller'); //  Controller

    //  Goal Form
    require('./admin/goal-form/admin.goal-form.directive');
    require('./admin/goal-form/admin.goal-form.controller');

    //  Single Test
    require('./admin/single-test/admin.single-test.directive');
    require('./admin/single-test/admin.single-test.controller');

    //  Tests List
    require('./admin/tests-list/admin.tests-list.directive');
    require('./admin/tests-list/admin.tests-list.controller');

    //  Test Create Form
    require('./admin/test-form/admin.test-form.directive');
    require('./admin/test-form/admin.test-form.controller');

    //  Question Form
    require('./admin/question-form/admin.question-form.directive');
    require('./admin/question-form/admin.question-form.controller');
    require('./admin/question-form/admin.image-question-form.controller');

    // Teachers List
    require('./admin/teachers-list/admin.teachers-list.controller');

    // Miscellaneous
      // TODO: Refactor these controllers
      // require('./admin/controllers/test_controller')(progCheck);
      // require('./admin/controllers/add_test_form_controller')(progCheck);
      // require('./admin/controllers/edit_test_form_controller')(progCheck);

  //  Teacher
    //  Data Services
    require('./teacher/data-services/teacher.data.service');
    require('./teacher/data-services/teacher.students.data');
    require('./teacher/data-services/teacher.attempts.data');
    require('./teacher/data-services/teacher.standards.data');

    // Goal Progress Report
    require('./teacher/goal-progress-report/teacher.goal-progress-report.directive');
    require('./teacher/goal-progress-report/teacher.goal-progress-report.controller');

    // Single Standard
    require('./teacher/single-standard/teacher.single-standard-modal.controller');  //  Modal Controller

    // Single Student
    require('./teacher/single-student/teacher.single-student.controller');

    // Standards List
    require('./teacher/standards-list/teacher.standards-list-modal.controller');

    //  Student Attempts
    require('./teacher/student-attempts/teacher.student-attempts.directive');
    require('./teacher/student-attempts/teacher.student-attempts.controller');
    // Student Attempt
    require('./teacher/student-attempts/student-attempt/teacher.student-attempt.directive');
    // Attempt Question
    require('./teacher/student-attempts/attempt-question/teacher.attempt-question.directive');

    // Student Form
    require('./teacher/student-form/teacher.student-form.controller');

    //  Student Goals List Directive
    require('./teacher/student-goals-list/teacher.student-goals-list.controller');
    require('./teacher/student-goals-list/teacher.student-goals-list.directive');
    require('./teacher/student-goals-list/student-goal/teacher.student-goal.directive.js');

    //  Student Goal Settings
    require('./teacher/student-goal-settings/teacher.student-goal-settings.controller');

    // Students List
    require('./teacher/students-list/teacher.students-list.controller');


  //  Students
    //  Data Services
    require('./student/data-services/student.data.service');
    require('./student/data-services/student.test.data');

    //  Attempt Review
    require('./student/attempt-review/student.attempt-review.controller');

    //  Questions
    require('./student/question/student.question.controller');
    require('./student/question/student.question.directive');

    //  Test
    require('./student/test/student.test.controller');

    // Tests List
    require('./student/tests-list/student.tests-list.controller');

})();

