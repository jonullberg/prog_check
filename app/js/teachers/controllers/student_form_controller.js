'use strict';

module.exports = function(app) {
  app.controller('StudentFormCtrl', ['$scope', '$modalInstance', '$routeParams', '$location', 'Errors', 'TeacherData', function($scope, $modalInstance, $routeParams, $location, Errors, TeacherData) {

    $scope.getStudent = function() {
      getStudent();
    };

    $scope.questionOptions = [5, 10];

    $scope.isDeleteShown = false;

    $scope.saveStudent = function(student) {
      student.teacherId = $routeParams.teacherId;
      if ($scope.studentForm.$valid) {
        if ($scope.params.formType === 'editing') {
          saveStudent(student, function(err, data) {
            if (err) {
              return Errors.addError({
                'msg': 'Failed to update student'
              });
            }
            console.log(data);
            $modalInstance.close();
            $location.path('/teacher/' + $routeParams.teacherId + '/students/' + $scope.student._id);
          });
        } else if ($scope.params.formType === 'creating') {
          createStudent(student, function(err, data) {
            if (err) {
              return Errors.addError({
                'msg': 'Failed to create student'
              });
            }
            $modalInstance.close();
            $location.path('/teacher/' + $routeParams.teacherId + '/students/' + data._id);
          });
        }
      }
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

    $scope.toggleDelete = function() {
      $scope.isDeleteShown = !$scope.isDeleteShown;
    };

    $scope.deleteStudent = function(student) {
      TeacherData.Students.deleteStudent(student, function(err) {
        if (err) {
          return Errors.addError({
            'msg': 'There was an error deleting that student'
          });
        }
        TeacherData.Students.student = null;
        $modalInstance.close();
        $location.path('/teacher/' + $routeParams.teacherId + '/students');
      });
    };
    $scope.priorityMessage = null;
    if ($scope.student.goalPriority === 'date') {
      $scope.priorityMessage = 'The most recently attempted goals will be last in the list. The goal that has been attempted the longest ago will be recommended to be done first.';
    } else if ($scope.student.goalPriority === 'manual') {
      $scope.priorityMessage = 'You will have to set goal priority manually. When you add a goal you can specify that it is a certain priority. It will not be changed unless you change it yourself.';
    } else {
      $scope.priorityMessage = null;
    }

    function getStudent() {
      if (TeacherData.Students.student) {
        $scope.student = TeacherData.Students.student;
      }
    }

    function createStudent(student, callback) {
      TeacherData.Students.createStudent(student, function(err, data) {
        if (err) {
          callback(err);
        }
        callback(err, data);
      });
    }

    function saveStudent(student, callback) {
      TeacherData.Students.saveStudent(student, function(err, data) {
        if (err) {
          callback(err);
        }
        callback(err, data);
      });
    }
  }]);
};
