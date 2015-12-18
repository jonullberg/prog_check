module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .directive('pcSingleTest', pcSingleTest)

  function pcSingleTest() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/admin/single-test.html',
      controller: 'SingleTestCtrl',
      controllerAs: 'st'
    };
  }
}
