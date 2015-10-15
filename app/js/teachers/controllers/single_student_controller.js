'use strict';

module.exports = function(app) {
  app.controller('SingleStudentCtrl', ['$scope', '$routeParams', '$modal', '$location', '$rootScope', '$sce', 'Errors', 'Students', 'TeacherData', function($scope, $routeParams, $modal, $location, $rootScope, $sce, Errors, Students, TeacherData) {

    $scope.trustAsHtml = $sce.trustAsHtml;

    $scope.attempts = TeacherData.Attempts.attempts;

    $scope.toggleDelete = function() {
      $scope.isDeleteShown = !$scope.isDeleteShown;
    };

    $scope.$on('student:changed', getStudent);

    $scope.init = function() {
      getStudent();
      getAttempts();
    };

    $scope.goBack = function() {
      TeacherData.Students.student = null;
      $location.path('teacher/'+ $routeParams.teacherId + '/students');
    };

    $scope.removeGoal = function(goal) {
      TeacherData.Students.removeGoal(goal);
    };

    $scope.openGoalForm = function() {
      $modal.open({
        animation: true,
        templateUrl: '/templates/directives/standards/standards_list.html',
        size: 'lg',
        controller: 'StandardsListModalCtrl'
      });
    };

    $scope.showButtons = function(goal) {
      goal.buttonsShowing = !goal.buttonsShowing;
    };

    $scope.saveStudent = function(student) {
      student.numberOfQuestions = $scope.selectedNumber;
      TeacherData.Students.saveStudent(student, function(err, data) {
        if (err) {
          return Errors.addError({
            'msg': 'There was an error updating that student'
          });
        }
        $location.path('/teacher/' + $routeParams.teacherId + '/students/' + data._id);
      });
    };

    $scope.editStudentModal = function(student) {
      if (!student.goalPriority) {
        student.goalPriority = null;
      }
      TeacherData.Students.student = student;
      var scope = $rootScope.$new();
      scope.params = {
        formType: 'editing',
        buttonText: 'Save Student'
      };
      scope.student = student;
      $modal.open({
        animation:true,
        templateUrl: '/templates/directives/teachers/student_form.html',
        size:'lg',
        controller: 'StudentFormCtrl',
        scope: scope
      });
    };
    $scope.showAttempt = function(attempt) {
      $scope.attempts.forEach(function(attempt) {
        attempt.questionsShowing = false;
      });
      attempt = setAttemptStyling(attempt);
      attempt.questionsShowing = true;

    };
    $scope.showAnswers = function(question) {
      question.answersShowing = !question.answersShowing;
    };
    $scope.editStudentGoal = editStudentGoal;

    function editStudentGoal(goal) {
      var scope = $rootScope.$new();
      scope.params = {
        buttonText: 'Update Goal',
        formType: 'editing'
      };
      scope.student = $scope.student;
      scope.goal = goal;
      $modal.open({
        animation:true,
        templateUrl: '/templates/teacher/student_goal_settings.html',
        size:'lg',
        controller: 'StudentGoalSettingsCtrl',
        scope: scope

      })
    }
    function getStudent() {
      if (!!TeacherData.Students.student) {
        $scope.student = TeacherData.Students.student;
      } else {
        TeacherData.Students.getStudent($routeParams.studentId, function(err, data) {
          if (err) {
            return Errors.addError({
              'msg': 'Failed to get that student'
            });
          }
          TeacherData.Students.student = data[0];
          $scope.student = TeacherData.Students.student;
          getAttempts();
        });
      }
    };

    function getAttempts() {
      if (TeacherData.Attempts.attempts && TeacherData.Attempts.attempts.length) {
        $scope.attempts = TeacherData.Attempts.attemps;
      } else {
        TeacherData.Attempts.getAttempts($routeParams.studentId, function(data) {
          $scope.attempts = TeacherData.Attempts.attempts;
        });
      }
    };
    function setAttemptStyling(attempt) {
      attempt.questions.forEach(function(question) {
        if (question.result === 'correct') {
          question.icon = 'glyphicon glyphicon-ok green';
          question.color = 'green';
        } else {
          question.icon = 'glyphicon glyphicon-remove red';
          question.color = 'red';
        }
      });
      return attempt;
    }
  }]);
};

