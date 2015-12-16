var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('StudentFormCtrl', ['$scope', '$uibModalInstance', '$routeParams', '$location', 'Errors', 'TeacherData', studentFormCtrl]);
    // export = function(app) {
    //   app.controller('StudentFormCtrl', ['$scope', '$uibModalInstance', '$routeParams', '$location', 'Errors', 'TeacherData', studentFormCtrl]);
    // }
    function studentFormCtrl($scope, $uibModalInstance, $routeParams, $location, Errors, TeacherData) {
        $scope.init = init;
        $scope.$on('student:changed', getStudent);
        $scope.questionOptions = [5, 10];
        $scope.isDeleteShown = false;
        $scope.saveStudent = function (student) {
            student.teacherId = $routeParams.teacherId;
            if ($scope.studentForm.$valid) {
                if ($scope.params.formType === 'editing') {
                    updateStudent(student);
                }
                else if ($scope.params.formType === 'creating') {
                    createStudent(student);
                }
            }
            $uibModalInstance.close();
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.toggleDelete = function () {
            $scope.isDeleteShown = !$scope.isDeleteShown;
        };
        $scope.deleteStudent = function (student) {
            TeacherData.Students.deleteStudent(student._id, function (err) {
                TeacherData.Students.setStudent(null);
                $uibModalInstance.close();
                $location.path('/teacher/' + $routeParams.teacherId + '/students');
            });
        };
        function init() {
            getStudent();
        }
        function getStudent() {
            if (!TeacherData.Students.getStudent() && $scope.params.formType === 'editing') {
                TeacherData.Students.fetchStudent($routeParams.studentId);
            }
            $scope.student = TeacherData.Students.getStudent();
        }
        function createStudent(student) {
            TeacherData.Students.createStudent(student, function (err, data) {
                $location.path('/teacher/' + $routeParams.teacherId + '/students/' + data.student._id);
            });
        }
        function updateStudent(student) {
            TeacherData.Students.updateStudent(student, function () {
                $location.path('/teacher/' + $routeParams.teacherId + '/students/' + $scope.student._id);
            });
        }
    }
})(ProgCheck || (ProgCheck = {}));
