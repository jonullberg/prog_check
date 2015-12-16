var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('SingleTestCtrl', ['$scope', '$uibModal', '$rootScope', '$location', '$routeParams', '$sce', 'AdminData', 'SanitizeFractions', singleTestCtrl]);
    function singleTestCtrl($scope, $uibModal, $rootScope, $location, $routeParams, $sce, AdminData, SanitizeFractions) {
        $scope.$on('test:changed', getTest);
        var st = this;
        // Public Functions
        st.isDeleteShown = false;
        st.init = function () {
            getStandard();
            getTest();
        };
        st.trustAsHtml = $sce.trustAsHtml;
        /**
          * Will set selected test to null and send us back to test list
          */
        st.goBack = function () {
            AdminData.Tests.setTest(null);
            $location.path('/admin/standards/' + $routeParams.standardId);
        };
        /**
          * Will open a modal that allows user to input a new test
          * @param  {object} test The test that will be edited in form
          */
        st.editTest = function (test) {
            AdminData.Tests.setTest(test);
            var scope = $rootScope.$new();
            scope.params = {
                formType: 'editing',
                buttonText: 'Save Test'
            };
            $uibModal.open({
                animation: true,
                templateUrl: '/js/admin/test-form/test-form.html',
                controller: 'TestFormCtrl',
                size: 'lg',
                scope: scope
            });
        };
        $scope.addQuestion = function () {
            AdminData.Tests.setQuestion(null);
            var scope = $rootScope.$new();
            scope.params = {
                formType: 'creating',
                buttonText: 'Add Question'
            };
            var templateUrl;
            var controller;
            if (st.test.questionType === 'text') {
                templateUrl = '/templates/admin/modals/question_form_modal.html';
                controller = 'QuestionFormCtrl';
            }
            else if (st.test.questionType === 'image') {
                templateUrl = '/templates/admin/modals/image_question_form_modal.html';
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
                templateUrl = '/templates/admin/modals/question_form_modal.html';
                controller = 'QuestionFormCtrl';
            }
            else if (st.test.questionType === 'image') {
                templateUrl = '/templates/admin/modals/image_question_form_modal.html';
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
        $scope.toggleDelete = function () {
            $scope.isDeleteShown = !$scope.isDeleteShown;
        };
        function showAnswers(question) {
            question.showing = true;
        }
        function hideAnswers(question) {
            question.showing = false;
        }
        $scope.showAnswers = function (question) {
            $scope.test.questions.forEach(function (question) {
                question.showing = false;
            });
            question.showing = !question.showing;
        };
        $scope.showAnswerImages = function (question) {
            question.imageButtonsShowing = !question.imageButtonsShowing;
        };
        $scope.deleteQuestion = function (question) {
            AdminData.Tests.deleteQuestion($scope.test._id, question._id, function (err) {
            });
        };
        function getStandard() {
            var standard = AdminData.Standards.getStandard();
            if (standard) {
                $scope.standard = standard;
            }
            else {
                AdminData.Standards.fetchStandard($routeParams.standardId, function (err, data) {
                    $scope.standard = data.standard;
                });
            }
        }
        function getTest() {
            var test = AdminData.Tests.getTest();
            if (test) {
                $scope.test = AdminData.Tests.getTest();
            }
            else {
                AdminData.Tests.fetchTest($routeParams.testId, function (err, data) {
                    $scope.test = data.test;
                });
            }
        }
    }
})(ProgCheck || (ProgCheck = {}));
