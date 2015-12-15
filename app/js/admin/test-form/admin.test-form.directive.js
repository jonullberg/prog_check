var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .directive('pcTestForm', pcTestForm);
    function pcTestForm() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/js/admin/test-form/test-form.html',
            scope: {
                buttonText: '='
            },
            controller: 'TestFormCtrl',
            controllerAs: 'tf'
        };
    }
})(ProgCheck || (ProgCheck = {}));
