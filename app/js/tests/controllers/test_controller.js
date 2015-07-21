'use strict';

module.exports = function(app) {
  app.controller('testCtrl', ['$scope', '$filter', '$modal', 'RESTResource', 'dataStore', function($scope, $filter, $modal, resource, dataStore) {

    var Test = resource('tests');

    $scope.tests = dataStore.tests;

    $scope.errors = dataStore.errors;

    $scope.test = dataStore.test;

    $scope.masterTest;

    $scope.standard = dataStore.standard;

    $scope.isTestShowing = false;

    $scope.isDeleteShown = false;

    /**
     * Will make a GET request to /api/tests and return an array of tests to be displayed
     */
    $scope.getAll = function() {
      Test.getAll(function(err, data) {
        if (err) {
          return dataStore.errors.push({
            'msg': 'Error retrieving tests'
          });
        }
        dataStore.tests = data;
        $scope.tests = dataStore.tests;

      });
    };

    /**
     * Will add test to display, hide the form for adding a test, and make a POST request to the API to create a new test
     * @param  {object} test The specified test to create
     */
    $scope.createTest = function(test) {
      var newTest = angular.copy(test);
      var numberOfTests = $filter('filter')($scope.tests, {standardId: $scope.standard._id});
      test = {};
      newTest.testName = 'Test ' + (numberOfTests.length + 1);
      dataStore.tests.push(newTest);
      Test.create(newTest, function(err, data) {
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

    $scope.saveTest = function(test) {
      Test.save(test, function(err, data) {
        if (err) return $scope.errors.push({
          'msg': 'There was an error updating your test'
        });
        test.editing = false;
      });
    };
    $scope.addNewTest = function(test) {
      test.standardId = $scope.standard._id;
      $scope.createTest(test);
    };

    $scope.selectTest = function(test) {
      dataStore.test = test;
      $scope.toggleSingleTest();
    };

    $scope.newTest = function() {
      var controller = ['$scope', '$modalInstance', 'dataStore', function($scope, $modalInstance, dataStore) {


        $scope.buttonText = 'Add Test';
        $scope.question;
        $scope.areWeAddingQuestions;
        $scope.standard = dataStore.standard;
        $scope.$on('test:changed', function(event, data) {
          $scope.test = data.test;
        });

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

        var setGoal = function(test) {
          test._goal = test.goalId;
        };


        $scope.cancel = function(test) {
          angular.copy(dataStore.masterTest, test);
          $scope.setGoal(test);
          if ($scope.isTestFormShowing) {
            $scope.toggleTestForm();
          }
        };

        $scope.addNewTest = function(test) {
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
          if (!test.questions) {
            test.questions = [];
          }
        };

        $scope.cancelQuestion = function(question) {
          // angular.copy($scope.master, question);
          // question.editing = false;
          // $scope.areWeAddingQuestions = false;
          console.log(question);
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
      }];
      $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: '/templates/directives/test_form.html',
        controller: controller,
        size: 'lg'
      });
    };


    ////////////////////////////////////
    // Functions for Single Test page //
    ////////////////////////////////////

    /**
     * Will set selected test to null and send us back to test list
     */
    $scope.goBack = function() {
      dataStore.test = null;
      // $scope.test = dataStore.test;
      $scope.toggleSingleTest();
      if ($scope.isTestFormShowing) {
        $scope.toggleTestForm();
      }
    };

    $scope.editTest = function(test) {
      test.editing = true;
      dataStore.test = test;
      dataStore.masterTest = angular.copy(test);
      $scope.test = dataStore.test;
      if (!$scope.isTestFormShowing){
        $scope.toggleTestForm();
      }
    };

    $scope.toggleDelete = function() {
      $scope.isDeleteShown = !$scope.isDeleteShown;
    };

    $scope.removeTest = function(test) {
      dataStore.tests.splice(dataStore.tests.indexOf(test), 1);
      Test.remove(test, function(err) {
        if (err) return $scope.errors.push({
          'msg': 'There was an error deleting your test'
        });

      });
      $scope.toggleSingleTest();
      if ($scope.isTestFormShowing === true) {
        $scope.toggleTestForm();
      }
    };

    /////////////////////////////
    // Functions for Test Form //
    /////////////////////////////



    $scope.master;
    $scope.areWeAddingQuestions = false;
    $scope.getGoalId = function(test) {
      console.log($scope.standard);
      if (test) {
        console.log(test);
      }
    };
    $scope.addQuestion = function(question) {
      question.answers = Object.keys(question.answers)
        .map(function(key) {
          return question.answers[key];
        });
      $scope.test.questions.push(question);
      $scope.question = {};
      $scope.areWeAddingQuestions = false;
    };
    $scope.editQuestion = function(question) {
      question.editing = true;
      $scope.master = angular.copy(question);
      $scope.question = question;
    };
    $scope.saveQuestion = function(question) {
      question.editing = false;
      $scope.test.questions.splice($scope.test.questions.indexOf(question), 1, question);
      $scope.question = {};
    };
    $scope.cancelEdit = function(question) {
      angular.copy($scope.master, question);
      question.editing = false;
      $scope.areWeAddingQuestions = false;
      $scope.question = null;
    };

  }]);
};
