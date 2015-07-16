'use strict';

module.exports = function(app) {
  app.controller('standardsCtrl', ['$scope', '$filter', 'RESTResource', 'copy', 'dataStore', 'pcGrades', function($scope, $filter, resource, copy, dataStore, pcGrades) {

    var Standard = resource('standards');

    $scope.standards = dataStore.standards;
    $scope.errors = dataStore.errors;
    $scope.tests = dataStore.tests;
    $scope.quantity = 5;
    $scope.formShowing = false;
    $scope.standard = dataStore.standard;
    $scope.isStandardShowing;
    $scope.isStandardFormShowing;
    $scope.master = {};
    $scope.isTestShowing = false;
    $scope.isTestFormShowing = false;
    $scope.test = dataStore.test;
    $scope.isAlertShown = false;

    $scope.addStandard = function() {
      $scope.isStandardFormShowing = !$scope.isStandardFormShowing;
    };

    $scope.toggleTestForm = function() {
      $scope.isTestFormShowing = !$scope.isTestFormShowing;
    };

    $scope.toggleEdit = function(standard) {
      if (standard.editing) {
        angular.copy($scope.master, standard);
        $scope.master = {};
        standard.editing = false;
      } else {
        $scope.master = angular.copy(standard);
        standard.editing = true;
      }
    };

    $scope.testFn = function() {
      $scope.standard = standard;
    };
    /**
     * Will set a standard to be displayed to the user
     * @param {Object} standard The specificed standard to be displayed
     */
    $scope.showStandard = function(standard) {
      dataStore.standard = standard;
      $scope.standard = dataStore.standard;
      $scope.isStandardShowing = true;
      $scope.isStandardFormShowing = false;
      $scope.isTestShowing = false;
    };

    /**
     * Will make a GET request to /api/standards and return an array of standards to be displayed
     */
    $scope.getAllStandards = function() {
      Standard.getAll(function(err, data) {
        if (err) {
          return $scope.errors.push({
            'msg': 'Error retrieving standards'
          });
        }
        dataStore.standards = data;
        $scope.standards = dataStore.standards;
      });
    };

    /**
     * Will add standard to display, hide the form for adding a standard, and make a POST request to the API to create a new standard
     * @param  {object} standard The specified standard to create
     */
    $scope.createNewStandard = function(standard) {
      var newStandard = angular.copy(standard);
      dataStore.standards.push(newStandard);
      $scope.standard = newStandard;
      Standard.create(newStandard, function(err, data) {
        if (err) {
          return $scope.errors.push({
            'msg': 'There was an error creating your standard'
          });
        }
        $scope.standards.splice($scope.standards.indexOf(newStandard), 1, data);
        $scope.standard = data;
        dataStore.standards.splice(dataStore.standards.indexOf(newStandard), 1, data);

        $scope.isStandardFormShowing = false;
      });
    };

    /**
     * Will update a standard on the client and make a PUT request to the server to update the standard
     * @param  {object} standard The specified standard to update
     */
    $scope.saveStandard = function(standard) {
      Standard.save(standard, function(err, data) {
        if (err) return $scope.errors.push({
          'msg': 'There was an error while updating this standard'
        });
        standard.editing = false;
        $scope.standard = standard;
      });
    };

    /**
     * Will remove standard from display and make delete request to API to remove from database
     * @param  {object} standard The specified standard to delete
     */
    $scope.removeStandard = function(standard) {
      $scope.standards.splice($scope.standards.indexOf(standard), 1);
      dataStore.standards.splice(dataStore.standards.indexOf(standard), 1);

      $scope.standard = null;
      $scope.isStandardShowing = false;
      Standard.remove(standard, function(err) {
        if(err) return $scope.errors.push({
          'msg': 'There was an error deleting this standard'
        });

      });
    };

    $scope.goBack = function() {
      $scope.standard = null;
      $scope.isStandardShowing = false;
    };

    // Tests Controller
    // TODO: refactor into its own controller




    // TODO: put this into alert directive
    $scope.toggleAlert = function() {
      if ($scope.isAlertShown) {
        $scope.isAlertShown = false;
      } else {
        $scope.isAlertShown = true;
      }
    };



    $scope.toggleSingleTest = function() {
      $scope.isTestShowing = !$scope.isTestShowing;
    }

    $scope.goBackTest = function() {
      $scope.test = {};
      $scope.isTestShowing = false;
    };
    $scope.cancelEdit = function(test) {
    };
  }]);
};
