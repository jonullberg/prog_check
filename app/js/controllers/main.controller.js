var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('IndexCtrl', ['$scope', '$location', '$uibModal', indxCtrl]);
    function indexCtrl($scope, $location, $uibModal) {
        $scope.changeView = function (url) {
            $location.path(url);
        };
        $scope.$on('errors:changed', function () {
            $uibModal.open({
                animation: true,
                templateUrl: '/templates/directives/errors.html',
                controller: 'ErrorsCtrl',
                size: 'lg'
            });
        });
    }
})(ProgCheck || (ProgCheck = {}));
