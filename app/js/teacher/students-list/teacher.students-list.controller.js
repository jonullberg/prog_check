'use strict';
function studentsListCtrl($scope, $location, $uibModal, $rootScope, $routeParams, TeacherData) {
    $scope.$on('students:changed', getStudents);
    var sl = this;
    sl.init = function () {
        getStudents();
    };
    sl.showStudent = function (student) {
        TeacherData.Students.setStudent(student);
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
            templateUrl: '/templates/directives/teachers/student_form.html',
            size: 'lg',
            controller: 'StudentFormCtrl',
            scope: scope
        });
    };
    function getStudents() {
        if (!TeacherData.Students.getStudents()) {
            TeacherData.Students.fetchStudents($routeParams.teacherId);
        }
        sl.students = TeacherData.Students.getStudents();
    }
}
module.exports = function (app) {
    app.controller('StudentsListCtrl', ['$scope', '$location', '$uibModal', '$rootScope', '$routeParams', 'TeacherData', studentsListCtrl]);
};
