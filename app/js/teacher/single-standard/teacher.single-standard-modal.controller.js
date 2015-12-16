var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('SingleStandardModalCtrl', ['$scope', '$uibModal', '$uibModalInstance', '$cookies', '$rootScope', '$sce', 'TeacherData', singleStandardModalCtrl]);
    // export = function(app) {
    //   app.controller('SingleStandardModalCtrl', ['$scope', '$uibModal', '$uibModalInstance', '$cookies', '$rootScope', '$sce', 'TeacherData', singleStandardModalCtrl]);
    // };
    function singleStandardModalCtrl($scope, $uibModal, $uibModalInstance, $cookies, $rootScope, $sce, TeacherData) {
        $scope.$on('standard:changed', getStandard);
        var ssm = this;
        ssm.mainClass = 'modal modal-primary';
        ssm.headingClass = 'modal-heading';
        ssm.bodyClass = 'modal-body';
        ssm.footerClass = 'modal-footer';
        $scope.showExampleQuestion = showExample;
        $scope.showDescription = showDescription;
        // Public Functions
        $scope.init = function () {
            getStandard();
        };
        $scope.addGoal = function (goal) {
            var scope = $rootScope.$new();
            scope.params = {
                buttonText: 'Add Goal',
                formType: 'creating'
            };
            TeacherData.Students.setGoal(goal);
            scope.student = $scope.student;
            $uibModalInstance.close();
            $uibModal.open({
                animation: true,
                templateUrl: '/js/teacher/student-goal-settings/student-goal-settings.html',
                size: 'lg',
                controller: 'StudentGoalSettingsCtrl',
                scope: scope
            });
        };
        $scope.goBack = function () {
            $uibModalInstance.close();
            TeacherData.Standards.setStandard(null);
            $uibModal.open({
                animation: true,
                templateUrl: '/js/admin/standards-list/standards-list.html',
                size: 'lg',
                controller: 'StandardsListModalCtrl'
            });
        };
        // Private Functions
        function getStandard() {
            $scope.standard = TeacherData.Standards.getStandard();
        }
        function showExample(goal) {
            var showing = goal.enableExample;
            $scope.standard.goals.forEach(function (goal) {
                goal.enableExample = false;
            });
            goal.enableExample = !showing;
        }
        function showDescription(goal) {
            var showing = goal.descriptionShowing;
            $scope.standard.goals.forEach(function (goal) {
                goal.descriptionShowing = false;
            });
            goal.descriptionShowing = !showing;
        }
    }
})(ProgCheck || (ProgCheck = {}));
