module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .directive('deleteAlert', deleteAlert)

  function deleteAlert() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/delete_alert.html'
    };
  }

}
