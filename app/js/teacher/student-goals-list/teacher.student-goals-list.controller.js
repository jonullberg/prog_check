var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('StudentGoalsListCtrl', ['$scope', '$rootScope', '$routeParams', '$uibModal', 'TeacherData', studentGoalsListCtrl]);
    function studentGoalsListCtrl($scope, $rootScope, $routeParams, $uibModal, TeacherData) {
        $scope.$on('student:changed', getStudent);
        var sgl = this;
        sgl.init = function () {
            getStudent();
        };
        sgl.editStudentGoal = function (goal) {
            var scope = $rootScope.$new();
            scope.params = {
                buttonText: 'Update Goal',
                formType: 'editing'
            };
            scope.student = sgl.student;
            TeacherData.Students.setGoal(goal);
            $uibModal.open({
                animation: true,
                templateUrl: '/templates/teacher/student-goal-settings.html',
                size: 'lg',
                controller: 'StudentGoalSettingsCtrl',
                controllerAs: 'sgs',
                scope: scope
            });
        };
        function getStudent() {
            if (!TeacherData.Students.getStudent()) {
                TeacherData.Students.fetchStudent($routeParams.studentId);
            }
            sgl.student = TeacherData.Students.getStudent();
        }
    }
})(ProgCheck || (ProgCheck = {}));
