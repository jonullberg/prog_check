var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .directive('pcStandardForm', pcStandardForm);
    function pcStandardForm() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/js/admin/standard-form/standard-form.html',
            controller: 'StandardFormCtrl',
            controllerAs: 'sf',
            scope: {
                buttonText: '=',
                standard: '='
            }
        };
    }
})(ProgCheck || (ProgCheck = {}));
