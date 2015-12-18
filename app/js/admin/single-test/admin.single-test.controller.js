var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('SingleTestCtrl', ['$scope', '$uibModal', '$rootScope', '$location', '$routeParams', '$sce', 'AdminData', 'SanitizeFractions', singleTestCtrl]);
    function singleTestCtrl($scope, $uibModal, $rootScope, $location, $routeParams, $sce, AdminData, SanitizeFractions) {
        $scope.$on('test:changed', getTest);
        var st = this;
        st.isDeleteShown = false;
        st.init = function () {
            getStandard();
            getTest();
        };
        st.trustAsHtml = $sce.trustAsHtml;
        st.goBack = function () {
            AdminData.Tests.setTest(null);
            $location.path('/admin/standards/' + $routeParams.standardId);
        };
        st.editTest = function (test) {
            AdminData.Tests.setTest(test);
            var scope = $rootScope.$new();
            scope.params = {
                formType: 'editing',
                buttonText: 'Save Test'
            };
            $uibModal.open({
                animation: true,
                templateUrl: '/templates/admin/test-form.html',
                controller: 'TestFormCtrl',
                controllerAs: 'tf',
                size: 'lg',
                scope: scope
            });
        };
        st.addQuestion = function () {
            AdminData.Tests.setQuestion(null);
            var scope = $rootScope.$new();
            scope.params = {
                formType: 'creating',
                buttonText: 'Add Question'
            };
            var templateUrl;
            var controller;
            if (st.test.questionType === 'text') {
                templateUrl = '/templates/admin/question-form.html';
                controller = 'QuestionFormCtrl as qf';
            }
            else if (st.test.questionType === 'image') {
                templateUrl = '/templates/admin/image-question-form.html';
                controller = 'ImageQuestionFormCtrl';
            }
            $uibModal.open({
                animation: true,
                templateUrl: templateUrl,
                controller: controller,
                size: 'lg',
                scope: scope
            });
        };
        st.editQuestion = function (question) {
            AdminData.Tests.setQuestion(question);
            var scope = $rootScope.$new();
            scope.params = {
                formType: 'editing',
                buttonText: 'Save Question'
            };
            var templateUrl;
            var controller;
            if (st.test.questionType === 'text') {
                templateUrl = '/templates/admin/question-form.html';
                controller = 'QuestionFormCtrl as qf';
            }
            else if (st.test.questionType === 'image') {
                templateUrl = '/templates/admin/image-question-form.html';
                controller = 'ImageQuestionFormCtrl';
            }
            $uibModal.open({
                animation: true,
                templateUrl: templateUrl,
                controller: controller,
                size: 'lg',
                scope: scope
            });
        };
        st.deleteTest = function (test) {
            AdminData.Tests.deleteTest(test._id);
            $location.path('/admin/standards/' + st.standard._id);
        };
        st.toggleDelete = function () {
            st.isDeleteShown = !st.isDeleteShown;
        };
        st.showAnswers = function (question) {
            var original = question.showing;
            st.test.questions.forEach(function (question) {
                question.showing = false;
            });
            question.showing = !original;
        };
        st.showAnswerImages = function (question) {
            question.imageButtonsShowing = !question.imageButtonsShowing;
        };
        st.deleteQuestion = function (question) {
            AdminData.Tests.deleteQuestion(st.test._id, question._id, function (err) {
            });
        };
        function showAnswers(question) {
            question.showing = true;
        }
        function hideAnswers(question) {
            question.showing = false;
        }
        function getStandard() {
            if (!AdminData.Standards.getStandard()) {
                AdminData.Standards.fetchStandard($routeParams.standardId);
            }
            st.standards = AdminData.Standards.getStandard();
        }
        function getTest() {
            if (!AdminData.Tests.getTest()) {
                AdminData.Tests.fetchTest($routeParams.testId);
            }
            st.test = AdminData.Tests.getTest();
        }
    }
})(ProgCheck || (ProgCheck = {}));
