module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .directive('pcStandardForm', pcStandardForm)

  function pcStandardForm() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/admin/standard-form.html',
      controller: 'StandardFormCtrl',
      controllerAs: 'sf',
      scope: {
        buttonText: '=',
        standard: '='
      }
    };
  }
}
