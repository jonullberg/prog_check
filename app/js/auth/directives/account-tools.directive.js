var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .directive('pcAccountTools', pcAccountTools);
    function pcAccountTools() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/templates/directives/account_tools.html',
            scope: {
                getHeaders: '&'
            },
            controller: 'AccountToolsCtrl'
        };
    }
})(ProgCheck || (ProgCheck = {}));
