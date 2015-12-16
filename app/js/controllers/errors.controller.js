var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('ErrorsCtrl', ['$scope', '$uibModalInstance', 'Errors', errorsCtrl]);
    function errorsCtrl($scope, $uibModalInstance, Errors) {
        $scope.errors = Errors.errors;
        $scope.testFn = function () {
            console.log($scope.errors);
        };
        $scope.removeError = function (error) {
            $scope.errors.slice($scope.errors.indexOf(error), 1);
            Errors.removeError(error);
        };
        $scope.close = function () {
            $uibModalInstance.close();
        };
    }
})(ProgCheck || (ProgCheck = {}));
