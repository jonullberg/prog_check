var ProgCheck;
(function (ProgCheck) {
    var Directives;
    (function (Directives) {
        'use strict';
        angular
            .module('progCheck')
            .directive('pcDeleteAlert', pcDeleteAlert);
        function pcDeleteAlert() {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/templates/directives/delete-alert.tmpl.html',
                scope: {
                    item: '=',
                    delete: '&',
                    toggle: '&',
                    text: '='
                },
                link: function (scope, iEl, iAttr) {
                }
            };
        }
    })(Directives = ProgCheck.Directives || (ProgCheck.Directives = {}));
})(ProgCheck || (ProgCheck = {}));
