'use strict';
module.exports = function (app) {
    app.controller('StudentGoalSettingsCtrl', ['$scope', '$uibModalInstance', '$routeParams', 'TeacherData', function ($scope, $uibModalInstance, $routeParams, TeacherData) {
            $scope.init = init;
            $scope.$on('goal:changed', getGoal);
            $scope.save = function (goal) {
                if ($scope.params.formType === 'editing') {
                    updateGoal(goal);
                }
                else if ($scope.params.formType === 'creating') {
                    createGoal(goal);
                }
                $uibModalInstance.close();
            };
            $scope.cancel = function () {
                $uibModalInstance.dismiss();
            };
            function init() {
                getGoal();
            }
            function getGoal() {
                $scope.goal = TeacherData.Students.getGoal();
            }
            function updateGoal(goal) {
                TeacherData.Students.updateGoal($routeParams.studentId, goal);
            }
            function createGoal(goal) {
                TeacherData.Students.createGoal($routeParams.studentId, goal);
            }
        }]);
};
