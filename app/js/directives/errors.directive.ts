module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .directive('pcErrors', pcErrors)

  function pcErrors() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/errors.html',
      controller: 'ErrorsCtrl'
    };
  }

}
