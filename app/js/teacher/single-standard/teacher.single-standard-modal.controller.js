'use strict';
function singleStandardModalCtrl($scope, $uibModal, $uibModalInstance, $cookies, $rootScope, $sce, TeacherData) {
    $scope.$on('standard:changed', getStandard);
    var ssm = this;
    ssm.mainClass = 'modal modal-primary';
    ssm.headingClass = 'modal-heading';
    ssm.bodyClass = 'modal-body';
    ssm.footerClass = 'modal-footer';
    $scope.showExampleQuestion = showExample;
    $scope.showDescription = showDescription;
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
            templateUrl: '/templates/teacher/student_goal_settings.html',
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
            templateUrl: '/templates/directives/standards/standards_list.html',
            size: 'lg',
            controller: 'StandardsListModalCtrl'
        });
    };
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
module.exports = function (app) {
    app.controller('SingleStandardModalCtrl', ['$scope', '$uibModal', '$uibModalInstance', '$cookies', '$rootScope', '$sce', 'TeacherData', singleStandardModalCtrl]);
};
