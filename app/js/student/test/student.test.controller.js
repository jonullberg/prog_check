var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('StudentTestCtrl', ['$scope', '$routeParams', '$location', 'StudentData', 'AuthenticationService', 'UserService', studentTestCtrl]);
    function studentTestCtrl($scope, $routeParams, $location, StudentData, AuthenticationService, UserService) {
        $scope.$on('student:changed', getStudent);
        $scope.$on('test:changed', getTest);
        var studentTestCtrl = this;
        var current = 1;
        studentTestCtrl.nextText = 'Next';
        studentTestCtrl.init = function () {
            getStudent();
            getTest();
            studentTestCtrl.activeQuestion = studentTestCtrl.test.questions[0];
        };
        studentTestCtrl.nextQuestion = nextQuestion;
        function nextQuestion() {
            var currentQuestion = studentTestCtrl.test.questions[current - 1];
            var nextQuestion = studentTestCtrl.test.questions[current];
            if (current == studentTestCtrl.test.maxQuestions) {
                return submitTest(studentTestCtrl.test);
            }
            else {
                if (currentQuestion.submitted) {
                    currentQuestion.type = 'success';
                    nextQuestion.type = '';
                    current += 1;
                    if (current === studentTestCtrl.test.maxQuestions) {
                        studentTestCtrl.nextText = 'Submit';
                    }
                    else {
                        studentTestCtrl.nextText = 'Next';
                    }
                    studentTestCtrl.activeQuestion = nextQuestion;
                }
            }
        }
        studentTestCtrl.previousQuestion = function () {
            current--;
            if (current !== studentTestCtrl.test.maxQuestions) {
                studentTestCtrl.nextText = 'Next';
            }
            else {
                studentTestCtrl.nextText = 'Submit';
            }
            studentTestCtrl.activeQuestion = studentTestCtrl.test.questions[current - 1];
        };
        studentTestCtrl.selectAnswer = function (answer) {
            studentTestCtrl.test.questions[(current - 1)].submitted = answer;
        };
        studentTestCtrl.goBackToTests = function goBackToTestsList() {
            StudentData.Tests.setTest(null);
            $location.path('/student/' + $routeParams.studentId + '/tests/');
        };
        function getTest() {
            studentTestCtrl.test = StudentData.Tests.getTest();
        }
        function getStudent() {
            studentTestCtrl.student = StudentData.getStudent();
        }
        function submitTest(test) {
            studentTestCtrl.disabled = true;
            StudentData.Tests.createTest($routeParams.studentId, test, $routeParams.goalId, function goToAttemptReview(err, data) {
                $location.path('/student/' + $routeParams.studentId + '/attempt/' + data.attempt._id);
                StudentData.setStudent(data.student);
            });
        }
    }
})(ProgCheck || (ProgCheck = {}));
