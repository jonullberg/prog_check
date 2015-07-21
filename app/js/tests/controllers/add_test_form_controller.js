'use strict';

module.exports = function(app) {
  app.controller('AddTestCtrl', ['$scope', '$modalInstance', '$filter', 'dataStore', function($scope, $modalInstance, $filter, dataStore) {


        $scope.buttonText = 'Add Test';
        $scope.question;
        $scope.areWeAddingQuestions;
        $scope.standard = dataStore.standard;
        $scope.$on('test:changed', function(event, data) {
          $scope.test = data.test;
        });

        var setGoal = function(test) {
          test._goal = test.goalId;
        };

        $scope.setData = function(test) {
          if (!test) {
            if (!dataStore.test) {
              test = {
                questions: []
              };
              dataStore.test = test;
            } else {
              if(!dataStore.test.questions) {
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
          var numberOfTests = $filter('filter')(dataStore.tests, {standardId: $scope.standard._id});
          test = {};
          newTest.testName = 'Test ' + (numberOfTests.length + 1);
          dataStore.tests.push(newTest);
          dataStore.createTest(newTest, function(err, data) {
            if (err) {
              return dataStore.errors.push({
                'msg': 'There was an error creating your test'
              });
            }

            $scope.test = null;
            dataStore.tests.splice(dataStore.tests.indexOf(newTest), 1, data);
            $scope.tests = dataStore.tests;

          });
          $modalInstance.close();
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
          dataStore.test = null;
          $modalInstance.dismiss();
        };

        $scope.addQuestion = function(question) {
          question.answers = Object.keys(question.answers)
            .map(function(key) {
              return question.answers[key];
            });
          dataStore.test = $scope.test;
          dataStore.addQuestion(question);
          $scope.question = {};
          $scope.areWeAddingQuestions = false;
        };
      }]);
};
