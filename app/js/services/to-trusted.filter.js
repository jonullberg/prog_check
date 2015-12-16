var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .filter('to_trusted', ['$sce', toTrusted]);
    function toTrusted($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }
})(ProgCheck || (ProgCheck = {}));
