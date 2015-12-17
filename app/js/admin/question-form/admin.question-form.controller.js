var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('QuestionFormCtrl', ['$scope', '$uibModalInstance', '$sce', '$routeParams', 'AdminData', questionFormCtrl]);
    function questionFormCtrl($scope, $uibModalInstance, $sce, $routeParams, AdminData) {
        var qf = this;
        qf.trustAsHtml = $sce.trustAsHtml;
        $scope.$on('test:changed', getTest);
        qf.init = function () {
            getTest();
            if (AdminData.Tests.getQuestion()) {
                getQuestion();
            }
        };
        qf.save = function (question) {
            if ($scope.params.formType === 'creating') {
                question.answers = Object.keys(question.answers)
                    .map(function (key) {
                    return question.answers[key];
                });
                createQuestion(question);
                AdminData.Tests.setQuestion(null);
            }
            else if ($scope.params.formType === 'editing') {
                updateQuestion(question);
                AdminData.Tests.setQuestion(null);
            }
            $uibModalInstance.close();
        };
        qf.cancel = function () {
            console.log('cancel');
            $uibModalInstance.dismiss();
        };
        function getQuestion() {
            qf.question = AdminData.Tests.getQuestion();
        }
        function getTest() {
            qf.test = AdminData.Tests.getTest();
        }
        function createQuestion(question) {
            AdminData.Tests.createQuestion($routeParams.testId, question);
        }
        function updateQuestion(question) {
            AdminData.Tests.updateQuestion($routeParams.testId, question);
        }
    }
})(ProgCheck || (ProgCheck = {}));
