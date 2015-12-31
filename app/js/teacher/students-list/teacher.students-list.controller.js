var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('StudentsListCtrl', ['$scope', '$location', '$uibModal', '$rootScope', '$routeParams', 'TeacherData', studentsListCtrl]);
    function studentsListCtrl($scope, $location, $uibModal, $rootScope, $routeParams, TeacherData) {
        $scope.$on('students:changed', getStudents);
        var sl = this;
        sl.dataLoaded = false;
        sl.init = function () {
            getStudents();
        };
        sl.showStudent = function (student) {
            $location.path('/teacher/' + $routeParams.teacherId + '/students/' + student._id);
        };
        sl.addStudent = function () {
            var scope = $rootScope.$new();
            TeacherData.Students.setStudent(null);
            scope.params = {
                formType: 'creating',
                buttonText: 'Create Student'
            };
            $uibModal.open({
                animation: true,
                templateUrl: '/templates/teacher/student-form.html',
                size: 'lg',
                controller: 'StudentFormCtrl',
                controllerAs: 'sf',
                scope: scope
            });
        };
        function getStudents() {
            sl.dataLoaded = false;
            if (!TeacherData.Students.getStudents()) {
                TeacherData.Students.fetchStudents($routeParams.teacherId, function () {
                    sl.dataLoaded = true;
                });
            }
            else {
                sl.dataLoaded = true;
            }
            sl.students = TeacherData.Students.getStudents();
        }
    }
})(ProgCheck || (ProgCheck = {}));
