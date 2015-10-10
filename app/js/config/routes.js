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
      .when('/admin/:adminId/home', {
        templateUrl: 'templates/views/admin/home.html',
        access: {
          requiredLogin: true,
          requiredAdmin: true
        }
        // No controller needed as of now
      })
      .when('/admin/:adminId/standards', {
        templateUrl: 'templates/views/standards.html',
        controller: 'StandardsCtrl',
        access: {
          requiredLogin: true,
          requiredAdmin: true,
          requiredTeacher:false,
          requiredStudent:false
        }
      })
      .when('/admin/:adminId/teachers', {
        templateUrl: 'templates/directives/teachers.html',
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
        templateUrl: 'templates/views/student/student_tests.html',
        controller: 'StudentTestsCtrl',
        access: {
          requiredLogin: true,
          requiredStudent: true
        }
      })
      // A student looking at a singular test/goal
      .when('/student/:studentId/tests/:testId', {
        templateUrl: 'templates/views/student/test.html',
        controller: 'TestCtrl',
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
      .when('/student/:studentId/attempt', {
        templateUrl: 'templates/views/student/attempt_review.html',
        controller: 'AttemptReviewCtrl',
        access: {
          requiredLogin: true,
          requiredStudent: true
        }
      })
      .otherwise({
        redirectTo: '/home'
      });
  }]);

  app.run(['$rootScope', '$location', 'AuthenticationService', function($rootScope, $location, AuthenticationService) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      if (next.access.requiredLogin && !AuthenticationService.isLogged) {
        $location.path('/not-authorized');
      }
      if (next.access.requiredAdmin && AuthenticationService.user.role !== 'admin') {
        $location.path('/not-authorized');
      }
      if (next.access.requiredTeacher && AuthenticationService.user.role !== 'teacher') {
        $location.path('/not-authorized');
      }
    });
  }]);
};
