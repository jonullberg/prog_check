module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .directive('pcAccountTools', pcAccountTools)

  function pcAccountTools() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/auth/account-tools.html',
      scope: {
        getHeaders: '&'
      },
      controller: 'AccountToolsCtrl'

    };
  }

}
