var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .directive('pcSignUp', pcSignUp);
    function pcSignUp() {
        return {
            restrict: 'ECA',
            replace: true,
            templateUrl: '/templates/auth/sign-in.html'
        };
    }
})(ProgCheck || (ProgCheck = {}));
