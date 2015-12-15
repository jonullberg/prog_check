var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('StudentGoalsListCtrl', ['$scope', '$rootScope', '$routeParams', '$uibModal', 'TeacherData', studentGoalsListCtrl]);
    function studentGoalsListCtrl($scope, $rootScope, $routeParams, $uibModal, TeacherData) {
        $scope.showAttempts = function (goal) {
            goal.isopen = !goal.isopen;
            TeacherData.Attempts.fetchAttemptsByGoal($routeParams.studentId, goal.goalId);
        };
        $scope.deleteGoal = function (goal) {
            TeacherData.Students.deleteGoal($routeParams.studentId, goal._id);
            toggleAlert(null);
        };
        $scope.init = init;
        $scope.toggleAlert = toggleAlert;
        $scope.$on('student:changed', getStudent);
        $scope.$on('attempts:changed', getAttempts);
        $scope.showButtons = function (goal) {
            var showing = goal.buttonsShowing;
            $scope.student.goals.forEach(function (goal) {
                goal.buttonsShowing = false;
            });
            goal.buttonsShowing = !showing;
        };
        $scope.editStudentGoal = editStudentGoal;
        function init() {
            getStudent();
        }
        function getAttempts() {
            $scope.attempts = TeacherData.Attempts.getAttempts();
        }
        function getStudent() {
            if (!TeacherData.Students.getStudent()) {
                TeacherData.Students.fetchStudent($routeParams.studentId);
            }
            $scope.student = TeacherData.Students.getStudent();
        }
        function editStudentGoal(goal) {
            var scope = $rootScope.$new();
            scope.params = {
                buttonText: 'Update Goal',
                formType: 'editing'
            };
            scope.student = $scope.student;
            TeacherData.Students.setGoal(goal);
            $uibModal.open({
                animation: true,
                templateUrl: '/js/teacher/student-goal-settings/student-goal-settings.html',
                size: 'lg',
                controller: 'StudentGoalSettingsCtrl',
                scope: scope
            });
        }
        function toggleAlert(goal) {
            if ($scope.isAlertShown) {
                $scope.isAlertShown = false;
            }
            else {
                $scope.isAlertShown = true;
            }
            $scope.goal = goal;
        }
    }
})(ProgCheck || (ProgCheck = {}));
