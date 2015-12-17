var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('StandardsListCtrl', ['$scope', '$uibModal', '$rootScope', '$cookies', '$location', 'AdminData', standardsListCtrl]);
    function standardsListCtrl($scope, $uibModal, $rootScope, $cookies, $location, AdminData) {
        var sl = this;
        $scope.$on('standards:changed', getStandards);
        sl.init = function () {
            getStandards();
        };
        sl.isAdmin = function () {
            if (AdminData.getUser().role === 'admin') {
                return true;
            }
            return false;
        };
        sl.newStandardModal = function () {
            var scope = $rootScope.$new();
            AdminData.Standards.setStandard(null);
            scope.params = {
                formType: 'creating',
                buttonText: 'Create Standard'
            };
            $uibModal.open({
                animation: true,
                templateUrl: '/js/admin/standard-form/standard-form.html',
                size: 'lg',
                controller: 'StandardFormCtrl',
                controllerAs: 'sf',
                scope: scope
            });
        };
        sl.select = function (standard) {
            AdminData.Standards.setStandard(standard);
            $location.path('/admin/standards/' + standard._id);
            return;
        };
        function getStandards() {
            if (!AdminData.Standards.getStandards()) {
                AdminData.Standards.fetchStandards();
            }
            sl.standards = AdminData.Standards.getStandards();
        }
    }
})(ProgCheck || (ProgCheck = {}));
