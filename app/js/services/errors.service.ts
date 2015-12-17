module ProgCheck {
  'use strict';

  angular.module('progCheck')
    .factory('Errors', ['$rootScope', errors]);

  function errors($rootScope) {
    return {
      errors: [],
      addError: function(error) {
        this.errors.push(error);
        $rootScope.$broadcast('errors:changed');
      },
      removeError: function(error) {
        this.errors.splice(this.errors.indexOf(error), 1);
      }
    };
  }
}
