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
          requiredAdmin: true
        }
      })
      .when('/admin/teachers', {
        templateUrl: 'templates/directives/teachers.html',
        access: {
          requiredLogin: true,
          requiredAdmin: true
        }
        // No controller as of now
      })
      .when('/teacher/home', {
        templateUrl: 'templates/views/teacher/home.html',
        access: {
          requiredLogin: true,
          requiredTeacher: true
        }
      })
      .when('/teacher/students', {
        templateUrl: 'templates/views/teacher/students_list.html',
        controller: 'StudentsListCtrl',
        access: {
          requiredLogin: true,
          requiredTeacher: true
        }
      })
      .when('/teacher/students/:studentId', {
        templateUrl: 'templates/views/teacher/single_student.html',
        controller: 'SingleStudentCtrl',
        access: {
          requiredLogin: true,
          requiredTeacher: true
        }
      })
      .when('/teacher/tests', {
        templateUrl: 'templates/views/teacher/tests.html',
        access: {
          requiredLogin: true,
          requiredTeacher: true
        }
      })
      .when('/student/home', {
        templateUrl: 'templates/views/student/home.html',
        controller: 'StudentHomeCtrl',
        access: {
          requiredLogin: true,
          requiredStudent: true
        }
      })
      .when('/student/tests', {
        templateUrl: 'templates/views/student/tests.html',
        controller: 'StudentTestsCtrl',
        access: {
          requiredLogin: true,
          requiredStudent: true
        }
      })
      .when('/students/tests/:testId', {
        templateUrl: 'templates/views/student/test.html',
        controller: 'TestCtrl',
        access: {
          requiredLogin: true,
          requiredStudent: true
        }
      })
      .when('/student/scores', {
        templateUrl: 'templates/views/student/scores.html',
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
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if (nextRoute.access.requiredLogin && !AuthenticationService.isLogged) {
        $location.path('/not-authorized');
      }
      if (nextRoute.access.requiredAdmin && AuthenticationService.role !== "admin") {
        $location.path('/not-authorized');
      }
      if (nextRoute.access.requiredTeacher && AuthenticationService.role !== 'teacher') {
        $location.path('/not-authorized');
      }
    });
  }]);
};
