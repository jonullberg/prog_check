module ProgCheck {
  angular
    .module('progCheck')
    .directive('pcStudentAttempt', ['$routeParams', 'TeacherData', pcStudentAttempt]);

  function pcStudentAttempt($routeParams, TeacherData) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/teacher/student-attempt.tmpl.html',
      scope: {
        attempt: '='
      },
      link: function(scope, iElement, iAttr) {

        scope.attemptAlertShowing = false;

        scope.toggleArchiveAttemptAlert = function toggleArchiveAttemptAlert() {
          scope.attemptAlertShowing = !scope.attemptAlertShowing;
        };

        scope.setStyling = function setStyling(attempt) {
          attempt = setAttemptStyling(attempt);
        };


        scope.archiveAttempt = function archiveAttempt(attempt) {
          TeacherData.Attempts.archiveAttempt($routeParams.studentId, attempt._id, function(err, data) {
            scope.attemptAlertShown = false;
          });
        };

        scope.showAnswers = function showAnswers(attempt, question) {
          var original = question.answersShowing;
          attempt.questions.forEach(turnOffQuestionsShowing);
          question.answersShowing = !original;

          function turnOffQuestionsShowing(question) {
            question.answersShowing = false;
          }
        };

        function setAttemptStyling(attempt) {
          attempt.questions.forEach(assignQuestionStyle);
          return attempt;

          function assignQuestionStyle(question) {
            if (question.result === 'correct') {
              question.icon = 'glyphicon glyphicon-ok green';
              question.color = 'green';
            } else {
              question.icon = 'glyphicon glyphicon-remove red';
              question.color = 'red';
            }
          }
        }



      }
    }
  }
}
