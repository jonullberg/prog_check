'use strict';
module.exports = function (app) {
    app.controller('testCtrl', ['$scope', '$filter', '$uibModal', 'RESTResource', 'dataStore', function ($scope, $filter, $uibModal, resource, dataStore) {
            var Test = resource('tests');
            $scope.tests = dataStore.tests;
            $scope.errors = dataStore.errors;
            $scope.test = dataStore.test;
            $scope.masterTest = null;
            $scope.standard = dataStore.standard;
            $scope.isTestShowing = false;
            $scope.isDeleteShown = false;
            $scope.createTest = function (test) {
                var newTest = angular.copy(test);
                var numberOfTests = $filter('filter')($scope.tests, {
                    standardId: $scope.standard._id
                });
                test = {};
                newTest.testName = 'Test ' + (numberOfTests.length + 1);
                dataStore.tests.push(newTest);
                Test.create(newTest, function (err, data) {
                    if (err) {
                        return dataStore.errors.push({
                            'msg': 'There was an error creating your test'
                        });
                    }
                    $scope.test = null;
                    dataStore.tests.splice(dataStore.tests.indexOf(newTest), 1, data);
                    $scope.tests = dataStore.tests;
                    $scope.isTestFormShowing = false;
                });
            };
            $scope.saveTest = function (test) {
                Test.save(test, function (err, data) {
                    if (err)
                        return $scope.errors.push({
                            'msg': 'There was an error updating your test'
                        });
                    test.editing = false;
                });
            };
            $scope.addNewTest = function (test) {
                test.standardId = $scope.standard._id;
                $scope.createTest(test);
            };
            $scope.selectTest = function (test) {
                dataStore.test = test;
                $scope.toggleSingleTest();
            };
            $scope.newTest = function () {
                $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: '/templates/directives/test_form.html',
                    controller: 'AddTestCtrl',
                    size: 'lg'
                });
            };
            $scope.goBack = function () {
                dataStore.test = null;
                $scope.toggleSingleTest();
                if ($scope.isTestFormShowing) {
                    $scope.toggleTestForm();
                }
            };
            $scope.editTest = function (test) {
                $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: '/templates/directives/test_form.html',
                    controller: 'EditTestCtrl',
                    size: 'lg',
                    resolve: {
                        test: function () {
                            return test;
                        }
                    }
                });
            };
            $scope.toggleDelete = function () {
                $scope.isDeleteShown = !$scope.isDeleteShown;
            };
            $scope.removeTest = function (test) {
                dataStore.tests.splice(dataStore.tests.indexOf(test), 1);
                Test.remove(test, function (err) {
                    if (err)
                        return $scope.errors.push({
                            'msg': 'There was an error deleting your test'
                        });
                });
                $scope.toggleSingleTest();
                if ($scope.isTestFormShowing === true) {
                    $scope.toggleTestForm();
                }
            };
            $scope.master = null;
            $scope.areWeAddingQuestions = false;
            $scope.getGoalId = function (test) {
                if (test) {
                }
            };
            $scope.addQuestion = function (question) {
                question.answers = Object.keys(question.answers)
                    .map(function (key) {
                    return question.answers[key];
                });
                $scope.test.questions.push(question);
                $scope.question = {};
                $scope.areWeAddingQuestions = false;
            };
            $scope.editQuestion = function (question) {
                question.editing = true;
                $scope.master = angular.copy(question);
                $scope.question = question;
            };
            $scope.saveQuestion = function (question) {
                question.editing = false;
                $scope.test.questions.splice($scope.test.questions.indexOf(question), 1, question);
                $scope.question = {};
            };
            $scope.cancelEdit = function (question) {
                angular.copy($scope.master, question);
                question.editing = false;
                $scope.areWeAddingQuestions = false;
                $scope.question = null;
            };
        }]);
};
