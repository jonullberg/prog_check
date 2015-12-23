var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('TermsCtrl', ['$scope', '$uibModalInstance', termsCtrl]);
    function termsCtrl($scope, $uibModalInstance) {
        $scope.close = function () {
            $uibModalInstance.close();
        };
    }
})(ProgCheck || (ProgCheck = {}));
