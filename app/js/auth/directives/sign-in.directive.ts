module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .directive('pcSignUp', pcSignUp)

  function pcSignUp() {
    return {
      restrict: 'ECA',
      replace: true,
      templateUrl: '/templates/directives/sign_in.html'
    };
  }
}
