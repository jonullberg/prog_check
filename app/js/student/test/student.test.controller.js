var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('StudentTestCtrl', ['$scope', '$routeParams', '$location', 'StudentData', 'AuthenticationService', studentTestCtrl]);
    function studentTestCtrl($scope, $routeParams, $location, StudentData, AuthenticationService) {
        $scope.$on('user:changed', getUser);
        $scope.$on('test:changed', getTest);
        $scope.init = function () {
            getUser();
            getTest();
            $scope.current = 1;
            $scope.question = $scope.test.questions[0];
        };
        $scope.nextText = 'Next';
        $scope.nextQuestion = function () {
            var currentQuestion = $scope.test.questions[$scope.current - 1];
            var nextQuestion = $scope.test.questions[$scope.current];
            if ($scope.current == $scope.test.maxQuestions) {
                checkAnswer(currentQuestion);
                return submitTest($scope.test);
            }
            else {
                if (currentQuestion.submitted) {
                    checkAnswer(currentQuestion);
                    currentQuestion.type = 'success';
                    nextQuestion.type = '';
                    $scope.current += 1;
                    if ($scope.current === $scope.test.maxQuestions) {
                        $scope.nextText = 'Submit';
                    }
                    else {
                        $scope.nextText = 'Next';
                    }
                    $scope.question = nextQuestion;
                }
            }
        };
        $scope.previousQuestion = function () {
            $scope.current--;
            if ($scope.current !== $scope.test.maxQuestions) {
                $scope.nextText = 'Next';
            }
            else {
                $scope.nextText = 'Submit';
            }
            $scope.question = $scope.test.questions[($scope.current - 1)];
        };
        $scope.selectAnswer = function (answer) {
            $scope.test.questions[($scope.current - 1)].submitted = answer;
        };
        $scope.goBackToTests = function () {
            StudentData.Tests.setTest(null);
            $location.path('/student/' + $routeParams.studentId + '/tests/');
        };
        function getTest() {
            if (!StudentData.Tests.getTest()) {
                return $location.path('/test-expired');
            }
            $scope.test = StudentData.Tests.getTest();
        }
        function getUser() {
            if (!AuthenticationService.getUser() || AuthenticationService.getUser().role !== 'student') {
                return $location.path('/test-expired');
            }
            $scope.student = AuthenticationService.getUser();
        }
        function submitTest(test) {
            $scope.disabled = true;
            StudentData.Tests.createTest($routeParams.studentId, test, $routeParams.goalId, function (err, data) {
                $location.path('/student/' + $routeParams.studentId + '/attempt/' + data.test._id);
            });
        }
        function checkAnswer(question) {
            if (question.submitted === question.correct) {
                question.result = 'correct';
                $scope.test.correctAnswers += 1;
            }
            else {
                question.result = 'incorrect';
            }
        }
    }
})(ProgCheck || (ProgCheck = {}));
