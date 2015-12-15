module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .directive('pcStandardsList', pcStandardsList)

  // export = function(app) {
  //   app.directive('pcStandardsList', pcStandardsList);
  // };
  function pcStandardsList() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/js/admin/standards-list/standards-list.html',
      controller: 'StandardsListCtrl',
      controllerAs: 'sl'
    };
  }
}
