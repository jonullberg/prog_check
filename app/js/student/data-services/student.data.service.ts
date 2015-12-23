module ProgCheck {

  'use strict';

  angular
    .module('progCheck')
    .factory('StudentData', ['$rootScope', '$http', 'Errors', 'StudentTestData', 'AuthenticationService', studentData])

  function studentData($rootScope, $http, Errors, Tests, Auth) {
    return {
      Tests: Tests
    };
  }

}
