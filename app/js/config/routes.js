'use strict';

module.exports = function(app) {
  app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
  }]);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/about', {
        templateUrl: 'templates/views/about.html',
        access: {
          requiredLogin: false,
          requiredAdmin: false,
          requiredTeacher: false,
          requiredStudent: false
        }
      })
      .when('/pricing', {
        templateUrl: 'templates/views/pricing.html',
        access: {
          requiredLogin: false,
          requiredAdmin: false,
          requiredTeacher: false,
          requiredStudent: false
        }
      })
      .when('/home', {
        templateUrl: 'templates/views/home.html',
        access: {
          requiredLogin: false,
          requiredAdmin: false,
          requiredTeacher: false,
          requiredStudent: false
        }
      })
      .when('/sign-in', {
        templateUrl: 'templates/views/sign_in.html',
        controller: 'AuthCtrl',
        access: {
          requiredLogin: false,
          requiredAdmin: false,
          requiredTeacher: false,
          requiredStudent: false
        }
      })
      .when('/sign-up', {
        templateUrl: 'templates/views/sign_up.html',
        controller: 'AuthCtrl',
        access: {
          requiredLogin: false,
          requiredAdmin: false,
          requiredTeacher: false,
          requiredStudent: false
        }
      })
      .when('/reset/success', {
        templateUrl: 'templates/auth/reset_success.html',
        access: {}
      })
      .when('/reset/:resetToken', {
        templateUrl: 'templates/auth/reset_password.html',
        access: {},
        controller: 'ResetPasswordCtrl'
      })
      .when('/not-authorized', {
        templateUrl: 'templates/views/not-authorized.html',
        access: {
          requiredLogin: false,
          requiredAdmin: false,
          requiredTeacher: false,
          requiredStudent: false
        }
      })
      .when('/student-sign-in', {
        templateUrl: 'templates/views/student_sign_in.html',
        controller: 'StudentAuthCtrl',
        access: {
          requiredLogin: false,
          requiredAdmin: false,
          requiredTeacher: false,
          requiredStudent: false
        }
      })
      .when('/admin/home', {
        templateUrl: 'templates/views/admin/home.html',
        access: {
          requiredLogin: true,
          requiredAdmin: true
        }
        // No controller needed as of now
      })
      .when('/admin/standards', {
        templateUrl: 'templates/views/standards.html',
        controller: 'StandardsCtrl',
        access: {
          requiredLogin: true,
          requiredAdmin: true,
          requiredTeacher:false,
          requiredStudent:false
        }
      })
      .when('/admin/standards/:standardId', {
        templateUrl: 'templates/admin/single_standard_container.html',
        access: {
          requiredLogin: true,
          requiredAdmin: true,
          requiredTeacher:false,
          requiredStudent:false
        }
      })
      .when('/admin/standards/:standardId/tests/:testId', {
        templateUrl: 'templates/admin/single_test.html',
        controller: 'SingleTestCtrl',
        access: {
          requiredLogin: true,
          requiredAdmin: true,
          requiredTeacher:false,
          requiredStudent: false
        }
      })
      .when('/admin/teachers', {
        templateUrl: 'templates/admin/teachers_list.html',
        controller: 'AdminTeachersListCtrl',
        access: {
          requiredLogin: true,
          requiredAdmin: true
        }
        // No controller as of now
      })
      .when('/teacher/:teacherId/home', {
        templateUrl: 'templates/views/teacher/home.html',
        access: {
          requiredLogin: true,
          requiredTeacher: true
        }
      })
      // A teacher looking at all of their students
      .when('/teacher/:teacherId/students', {
        templateUrl: 'templates/teacher/students_list.html',
        controller: 'StudentsListCtrl',
        access: {
          requiredLogin: true,
          requiredTeacher: true
        }
      })
      // A teacher looking at a single student
      .when('/teacher/:teacherId/students/:studentId', {
        templateUrl: 'templates/teacher/single_student.html',
        controller: 'SingleStudentCtrl',
        access: {
          requiredLogin: true,
          requiredTeacher: true
        }
      })
      // A student homepage
      .when('/student/:studentId/home', {
        templateUrl: 'templates/views/student/home.html',
        controller: 'StudentHomeCtrl',
        access: {
          requiredLogin: true,
          requiredStudent: true
        }
      })
      // A student looking at all of their tests available
      .when('/student/:studentId/tests', {
        templateUrl: 'templates/student/student_tests.html',
        controller: 'StudentTestsCtrl',
        access: {
          requiredLogin: true,
          requiredStudent: true
        }
      })
      // A student looking at a singular test/goal
      .when('/student/:studentId/tests/:testId', {
        templateUrl: 'templates/student/test.html',
        controller: 'StudentTestCtrl',
        access: {
          requiredLogin: true,
          requiredStudent: true
        }
      })
      .when('/student/:studentId/scores', {
        templateUrl: 'templates/views/student/scores.html',
        access: {
          requiredLogin: true,
          requiredStudent: true
        }
      })
      .when('/student/:studentId/attempt/:attemptId', {
        templateUrl: 'templates/views/student/attempt_review.html',
        controller: 'AttemptReviewCtrl',
        access: {
          requiredLogin: true,
          requiredStudent: true
        }
      })
      .when('/test-expired', {
        templateUrl: 'templates/student/test_expired.html'
      })
      .otherwise({
        redirectTo: '/home'
      });
  }]);

  app.run(['$rootScope', '$location', '$cookies', 'AuthenticationService', 'UserService', function($rootScope, $location, $cookies, Auth, UserService) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      if (next.access && next.access.requiredLogin && !Auth.getUser()) {
        if ($cookies.get('token')) {
          UserService.authToken($cookies.get('token'));
        } else {
          event.preventDefault();
          $location.path('/sign-in');
        }
      }
      if (next.access &&
          next.access.requiredAdmin &&
          Auth.getUser().role !== 'admin') {
        $location.path('/not-authorized');
      }
      if (next.access &&
          next.access.requiredTeacher &&
          Auth.user.role !== 'teacher') {
        $location.path('/not-authorized');
      }
    });
  }]);
};
