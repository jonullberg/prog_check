module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .directive('pcSingleTest', pcSingleTest)

  // export = function(app) {
  //   app.directive('pcSingleTest', pcSingleTest);
  // };
  function pcSingleTest() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/js/admin/single-test/single-test.html',
      controller: 'SingleTestCtrl',
      controllerAs: 'st'
    };
  }
}
