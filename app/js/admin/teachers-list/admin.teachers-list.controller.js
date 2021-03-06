var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('AdminTeachersListCtrl', ['$scope', 'AdminData', adminTeachersListCtrl]);
    function adminTeachersListCtrl($scope, AdminData) {
        $scope.$on('teachers:changed', getTeachers);
        $scope.init = function () {
            getTeachers();
        };
        $scope.updateTeacher = function (teacher) {
            AdminData.Teachers.updateTeacher(teacher);
        };
        function getTeachers() {
            if (!AdminData.Teachers.getTeachers()) {
                AdminData.Teachers.fetchTeachers();
            }
            $scope.teachers = AdminData.Teachers.getTeachers();
        }
    }
})(ProgCheck || (ProgCheck = {}));
