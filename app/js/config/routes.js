(function() {
  'use strict';

  angular.module('progCheck')

  .config(['$httpProvider', function($httpProvider) {
      $httpProvider.interceptors.push('TokenInterceptor');
    }])

  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
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
        templateUrl: 'templates/views/home.html'
      })
      .when('/sign-in', {
        templateUrl: 'templates/auth/sign-in.html',
        controller: 'AuthCtrl',
        access: {
          requiredLogin: false,
          requiredAdmin: false,
          requiredTeacher: false,
          requiredStudent: false
        }
      })
      .when('/sign-up', {
        templateUrl: 'templates/auth/sign-up.html',
        controller: 'AuthCtrl',
        access: {
          requiredLogin: false,
          requiredAdmin: false,
          requiredTeacher: false,
          requiredStudent: false
        }
      })
      .when('/reset/success', {
        templateUrl: 'templates/auth/reset-success.html',
      })
      .when('/reset/:resetToken', {
        templateUrl: 'templates/auth/reset-password.html',
        controller: 'ResetPasswordCtrl',
        access: {}
      })
      .when('/not-authorized', {
        templateUrl: 'templates/auth/not-authorized.html',
        access: {
          requiredLogin: false,
          requiredAdmin: false,
          requiredTeacher: false,
          requiredStudent: false
        }
      })
      .when('/student-sign-in', {
        templateUrl: 'templates/student/student-sign-in.html',
        controller: 'StudentAuthCtrl',
        access: {
          requiredLogin: false,
          requiredAdmin: false,
          requiredTeacher: false,
          requiredStudent: false
        }
      })
      .when('/admin/home', {
        templateUrl: 'templates/admin/home.html',
        access: {
          requiredLogin: true,
          requiredAdmin: true
        }
        // No controller needed as of now
      })
      .when('/admin/standards', {
        templateUrl: 'templates/admin/standards-list.html',
        controller: 'StandardsListCtrl',
        controllerAs: 'sl',
        access: {
          requiredLogin: true,
          requiredAdmin: true,
          requiredTeacher:false,
          requiredStudent:false
        }
      })
      .when('/admin/standards/:standardId', {
        templateUrl: 'templates/admin/single-standard-container.html',
        access: {
          requiredLogin: true,
          requiredAdmin: true,
          requiredTeacher:false,
          requiredStudent:false
        }
      })
      .when('/admin/standards/:standardId/tests/:testId', {
        templateUrl: 'templates/admin/single-test.html',
        controller: 'SingleTestCtrl',
        controllerAs: 'st',
        access: {
          requiredLogin: true,
          requiredAdmin: true,
          requiredTeacher:false,
          requiredStudent: false
        }
      })
      .when('/admin/teachers', {
        templateUrl: 'templates/admin/teachers-list.html',
        controller: 'AdminTeachersListCtrl',
        access: {
          requiredLogin: true,
          requiredAdmin: true
        }
      })
      .when('/teacher/:teacherId/home', {
        templateUrl: 'templates/teacher/home.html',
        access: {
          requiredLogin: true,
          requiredTeacher: true
        }
      })
      // A teacher looking at all of their students
      .when('/teacher/:teacherId/students', {
        templateUrl: 'templates/teacher/students-list.html',
        controller: 'StudentsListCtrl',
        controllerAs: 'sl',
        access: {
          requiredLogin: true,
          requiredTeacher: true
        }
      })
      // A teacher looking at a single student
      .when('/teacher/:teacherId/students/:studentId', {
        templateUrl: 'templates/teacher/single-student.html',
        controller: 'SingleStudentCtrl',
        controllerAs: 'ss',
        access: {
          requiredLogin: true,
          requiredTeacher: true
        }
      })
      // A student looking at all of their tests available
      .when('/student/:studentId/tests', {
        templateUrl: 'templates/student/student-tests.html',
        controller: 'StudentTestsCtrl',
        controllerAs: 'studentTestsCtrl',
        access: {
          requiredLogin: true,
          requiredStudent: true
        }
      })
      // A student looking at a singular test/goal
      .when('/student/:studentId/tests/:testId', {
        templateUrl: 'templates/student/student-test.tmpl.html',
        controller: 'StudentTestCtrl',
        controllerAs: 'studentTestCtrl',
        access: {
          requiredLogin: true,
          requiredStudent: true
        }
      })
      .when('/student/:studentId/scores', {
        templateUrl: 'templates/student/scores.html',
        access: {
          requiredLogin: true,
          requiredStudent: true
        }
      })
      .when('/student/:studentId/attempt/:attemptId', {
        templateUrl: 'templates/student/attempt-review.html',
        controller: 'AttemptReviewCtrl',
        controllerAs: 'ar',
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

    }])

    .run(['$rootScope', '$route', '$location', '$window', 'AuthenticationService', 'UserService', function($rootScope, $route, $location, $window, Auth, UserService) {
      $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if (next.access &&
          next.access.requiredLogin &&
          !Auth.getUser()) {
          if ($window.localStorage['token']) {
            UserService.authToken($window.localStorage['token']);
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
    }])

    .run(['$rootScope', '$location', '$browser', function($rootScope, $location, $browser) {
      var changeCounter = 0;

      $rootScope.$watch(function $locationWatch() {
        var oldUrl = $browser.url();
        var currentReplace = $location.$$replace;

        if (!changeCounter || oldUrl != $location.absUrl()) {
          changeCounter ++;
          $rootScope.$evalAsync(function() {
            if ($rootScope.$broadcast('$locationChangeStart', $location.absUrl(), oldUrl).defaultPrevented) {
              $location.$$parse(oldUrl);
            } else {
              $browser.url($location.absUrl(), currentReplace);
              afterLocationChange(oldUrl);
            }
          });
        }
        $location.$$replace = false;

        return changeCounter;
      })

      return $location;

      function afterLocationChange(oldUrl) {
        $rootScope.$broadcast('$locationChangeSuccess', $location.absUrl(), oldUrl);
      }

    }]);

})();
