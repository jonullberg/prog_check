var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('StandardsListModalCtrl', ['$scope', '$uibModal', '$uibModalInstance', '$rootScope', '$cookies', 'TeacherData', standardsListModalCtrl]);
    function standardsListModalCtrl($scope, $uibModal, $uibModalInstance, $rootScope, $cookies, TeacherData) {
        $scope.$on('standards:changed', getStandards);
        // Public Functions
        var sl = this;
        sl.init = function () {
            getStandards();
        };
        sl.select = function (standard) {
            TeacherData.Standards.setStandard(standard);
            var scope = $rootScope.$new();
            scope.params = {
                goalButtonText: 'Add Goal'
            };
            $uibModalInstance.close();
            $uibModal.open({
                animation: true,
                templateUrl: '/templates/teacher/single-standard-modal.html',
                size: 'lg',
                controller: 'SingleStandardModalCtrl',
                controllerAs: 'ss',
                scope: scope
            });
        };
        // Private Functions
        function getStandards() {
            if (!TeacherData.Standards.getStandards()) {
                TeacherData.Standards.fetchStandards();
            }
            sl.standards = TeacherData.Standards.getStandards();
        }
    }
})(ProgCheck || (ProgCheck = {}));
