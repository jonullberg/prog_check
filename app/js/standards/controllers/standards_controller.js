'use strict';

module.exports = function(app) {
  app.controller('standardsController', ['$scope', '$filter', 'RESTResource', 'copy', 'dataStore', function($scope, $filter, resource, copy, dataStore) {

    var Standard = resource('standards');
    var Test = resource('tests');

    $scope.standards = [];
    $scope.errors = [];
    $scope.tests = null;
    $scope.quantity = 5;
    $scope.formShowing = false;
    $scope.standard = null;
    $scope.isStandardShowing;
    $scope.isStandardFormShowing;
    $scope.master = {};
    $scope.isTestShowing;
    $scope.test = null;
    $scope.isTestFormShowing;
    $scope.isAlertShown = false;

    $scope.addStandard = function() {
      $scope.isStandardFormShowing = true;
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

    /**
     * Will set a standard to be displayed to the user
     * @param {Object} standard The specificed standard to be displayed
     */
    $scope.showStandard = function(standard) {
      $scope.standard = standard;
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
        $scope.standards = data;
      });
    };

    $scope.getAllTests = function() {
      Test.getAll(function(err, data) {
        if (err) {
          return $scope.errors.push({
            'msg': 'Error retrieving tests'
          });
        }
        dataStore.tests = data;
        $scope.tests = data;
      });
    };

    /**
     * Will add standard to display, hide the form for adding a standard, and make a POST request to the API to create a new standard
     * @param  {object} standard The specified standard to create
     */
    $scope.createNewStandard = function(standard) {
      var newStandard = copy(standard);
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


    $scope.showTest = function(test) {
      $scope.test = test;
      $scope.isTestShowing = true;
    };


    $scope.editTest = function(test) {
      $scope.test = test;
      $scope.isTestFormShowing = true
    };


    $scope.toggleAlert = function() {
      if ($scope.isAlertShown) {
        $scope.isAlertShown = false;
      } else {
        $scope.isAlertShown = true;
      }
    };
  }]);
};
