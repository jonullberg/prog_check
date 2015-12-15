var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('QuestionFormCtrl', ['$scope', '$uibModalInstance', '$sce', '$routeParams', 'AdminData', questionFormCtrl]);
    function questionFormCtrl($scope, $uibModalInstance, $sce, $routeParams, AdminData) {
        var qf = this;
        $scope.trustAsHtml = $sce.trustAsHtml;
        $scope.$on('test:changed', getTest);
        $scope.init = function () {
            getTest();
            getQuestion();
        };
        if ($scope.params.formType === 'creating') {
            $scope.save = function (question) {
                question.answers = Object.keys(question.answers)
                    .map(function (key) {
                    return question.answers[key];
                });
                createQuestion(question);
                AdminData.Tests.setQuestion(null);
                $uibModalInstance.close();
            };
        }
        if ($scope.params.formType === 'editing') {
            $scope.save = function (question) {
                updateQuestion(question);
                AdminData.Tests.setQuestion(null);
                $uibModalInstance.close();
            };
        }
        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };
        function getQuestion() {
            $scope.question = AdminData.Tests.getQuestion();
        }
        function getTest() {
            $scope.test = AdminData.Tests.getTest();
        }
        function createQuestion(question) {
            AdminData.Tests.createQuestion($routeParams.testId, question);
        }
        function updateQuestion(question) {
            AdminData.Tests.updateQuestion($routeParams.testId, question);
        }
    }
})(ProgCheck || (ProgCheck = {}));
