'use strict';

module.exports = function(app) {
  app.controller('AddTestCtrl', ['$scope', '$uibModalInstance', '$filter', 'dataStore', 'Tests', function($scope, $uibModalInstance, $filter, dataStore, Tests) {


        $scope.buttonText = 'Add Test';
        $scope.question = null;
        $scope.areWeAddingQuestions = false;
        $scope.standard = dataStore.standard;
        $scope.$on('test:changed', function(event, data) {
          $scope.test = data.test;
        });

        var setGoal = function(test) {
          test._goal = test.goalId;
        };

        $scope.setData = function(test) {
          if (!test) {
            if (!Tests.test) {
              test = {
                questions: []
              };
              Tests.test = test;
            } else {
              if(!Tests.test.questions) {
                dataStore.test.quesions = [];
              }
              test = dataStore.test;
            }
          }
          setGoal(test);
        };

        $scope.save = function(test) {
          test.standardId = $scope.standard._id;
          $scope.createTest(test);
        };

        $scope.createTest = function(test) {
          var newTest = angular.copy(test);
          var numberOfTests = $filter('filter')(Tests.tests, {standardId: $scope.standard._id});
          test = {};
          newTest.testName = 'Test ' + (numberOfTests.length + 1);
          Tests.tests.push(newTest);
          Tests.createTest(newTest, function(err, data) {
            if (err) {
              return dataStore.errors.push({
                'msg': 'There was an error creating your test'
              });
            }

            $scope.test = null;
            Tests.tests.splice(dataStore.tests.indexOf(newTest), 1, data);
            $scope.tests = dataStore.tests;

          });
          $uibModalInstance.close();
        };

        $scope.newQuestions = function(test) {
          $scope.areWeAddingQuestions = true;
          if (!test) {
            test = {
              questions: []
            };
          }
          if (!test.questions) {
            test.questions = [];
          }
        };

        $scope.cancelQuestion = function(question) {
          angular.copy($scope.master, question);
          $scope.areWeAddingQuestions = false;
        };

        $scope.cancel = function(test) {
          Tests.test = null;
          $uibModalInstance.dismiss();
        };

        $scope.addQuestion = function(question) {
          question.answers = Object.keys(question.answers)
            .map(function(key) {
              return question.answers[key];
            });
          Tests.test = $scope.test;
          Tests.addQuestion(question);
          $scope.question = {};
          $scope.areWeAddingQuestions = false;
        };
      }]);
};
