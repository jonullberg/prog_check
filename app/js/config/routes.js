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
          requiredLogin: false
        }
        // No controller needed as of now
      })
      .when('/pricing', {
        templateUrl: 'templates/views/pricing.html',
        access: {
          requiredLogin: false
        }
        // No controller needed as of now
      })
      .when('/home', {
        templateUrl: 'templates/views/home.html',
        access: {
          requiredLogin: false
        }
      })
      .when('/sign-in', {
        templateUrl: 'templates/views/sign_in.html',
        controller: 'authController',
        access: {
          requiredLogin: false
        }
      })
      .when('/sign-up', {
        templateUrl: 'templates/views/sign_up.html',
        controller: 'authController',
        access: {
          requiredLogin: false
        }
        // No controller as of now
      })
      .when('/admin/home', {
        templateUrl: 'templates/views/home.html',
        access: {
          requiredLogin: true,
          requiredAdmin: true
        }
        // No controller needed as of now
      })
      .when('/admin/standards', {
        templateUrl: 'templates/directives/standards.html',
        controller: 'standardsController',
        access: {
          requiredLogin: true,
          requiredAdmin: true
        }
      })
      .when('/admin/teachers', {
        templateUrl: '/templates/directives/teachers.html',
        access: {
          requiredLogin: true,
          requiredAdmin: true
        }
        // No controller as of now
      })
      .when('/teacher/home', {
        templateUrl: 'templates/teachers/views/home.html',
        access: {
          requiredLogin: true,
          requiredTeacher: true
        }
      })
      .when('/students/home', {
        templateUrl: 'templates/students/views/home.html',
        access: {
          requiredLogin: true
        }
      })
      .otherwise({
        redirectTo: '/home'
      });
  }]);

  app.run(['$rootScope', '$location', 'AuthenticationService', function($rootScope, $location, AuthenticationService) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if (nextRoute.access.requiredLogin && !AuthenticationService.isLogged) {
        $location.path('/home');
      }
      if (nextRoute.access.requiredAdmin && AuthenticationService.role !== "admin") {
        $location.path('/home');
      }
      if (nextRoute.access.requiredTeacher && AuthenticationService.role !== 'teacher') {
        $location.path('/home');
      }
    });
  }]);
};