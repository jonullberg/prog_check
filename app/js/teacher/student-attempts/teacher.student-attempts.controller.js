/**
 * For use in the Prog Check testing application
 * A controller for dealing with displaying a single students most recent attempts
 * Created by Jonathan Ullberg on 10/23/2015
 */
var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('StudentAttemptsCtrl', ['$scope', '$filter', '$routeParams', 'TeacherData', studentAttemptsCtrl]);
    // export = function(app) {
    //   app.controller('StudentAttemptsCtrl', ['$scope', '$filter', '$routeParams', 'TeacherData', studentAttemptsCtrl]);
    // }
    function studentAttemptsCtrl($scope, $filter, $routeParams, TeacherData) {
        $scope.init = init;
        $scope.$watch('totalAttempts');
        $scope.showAttempt = function (attempt) {
            $scope.attempts.forEach(function (attempt) {
                attempt.questionsShowing = false;
            });
            attempt = setAttemptStyling(attempt);
            attempt.questionsShowing = true;
        };
        $scope.isArchiveAttemptAlertShown = false;
        $scope.showAnswers = function (attempt, question) {
            attempt.questions.forEach(function (question) {
                question.answersShowing = false;
            });
            question.answersShowing = true;
        };
        $scope.setPage = setPage;
        $scope.currentPage = 1;
        $scope.quantity = 5;
        $scope.toggleArchiveAttemptAlert = toggleArchiveAttemptAlert;
        $scope.archiveAttempt = archiveAttempt;
        function init() {
            getAttempts();
        }
        function setPage(pageNo) {
            $scope.attempts = $scope.totalAttempts.slice((pageNo - 1) * $scope.quantity, (pageNo * $scope.quantity));
        }
        function getAttempts() {
            $scope.totalAttempts = $filter('orderBy')(TeacherData.Attempts.getAttempts(), '-dateTaken');
            $scope.attempts = $scope.totalAttempts.slice(($scope.currentPage - 1) * $scope.quantity, ($scope.currentPage * $scope.quantity));
        }
        function setAttemptStyling(attempt) {
            attempt.questions.forEach(function (question) {
                if (question.result === 'correct') {
                    question.icon = 'glyphicon glyphicon-ok green';
                    question.color = 'green';
                }
                else {
                    question.icon = 'glyphicon glyphicon-remove red';
                    question.color = 'red';
                }
            });
            return attempt;
        }
        function toggleArchiveAttemptAlert(attempt) {
            if ($scope.isArchiveAttemptAlertShown) {
                $scope.isArchiveAttemptAlertShown = false;
            }
            else {
                $scope.isArchiveAttemptAlertShown = true;
            }
            $scope.attempt = attempt;
        }
        function archiveAttempt(attempt) {
            TeacherData.Attempts.archiveAttempt($routeParams.studentId, attempt._id, function (err, data) {
                $scope.isArchiveAttemptAlertShown = false;
                getAttempts();
            });
        }
    }
})(ProgCheck || (ProgCheck = {}));
