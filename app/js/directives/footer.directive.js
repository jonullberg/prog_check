var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .directive('pcFooter', pcFooter);
    function pcFooter() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/templates/directives/footer.html',
            controller: 'FooterCtrl'
        };
    }
})(ProgCheck || (ProgCheck = {}));
