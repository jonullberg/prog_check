var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('StandardsListModalCtrl', ['$scope', '$uibModal', '$uibModalInstance', '$rootScope', '$cookies', 'TeacherData', standardsListModalCtrl]);
    function standardsListModalCtrl($scope, $uibModal, $uibModalInstance, $rootScope, $cookies, TeacherData) {
        $scope.$on('standards:changed', getStandards);
        var sl = this;
        sl.dataLoaded = false;
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
        function getStandards() {
            if (!TeacherData.Standards.getStandards()) {
                TeacherData.Standards.fetchStandards(function (err, data) {
                    sl.dataLoaded = true;
                });
            }
            else {
                sl.dataLoaded = true;
            }
            sl.standards = TeacherData.Standards.getStandards();
        }
    }
})(ProgCheck || (ProgCheck = {}));
