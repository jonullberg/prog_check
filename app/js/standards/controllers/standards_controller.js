'use strict';

module.exports = function(app) {
  app.controller('standardsController', ['$scope', 'RESTResource', 'copy', 'dataStore', function($scope, resource, copy, dataStore) {

    /**
     * Calls on our REST resource to hit the API at /api/standards
     */
    var Standard = resource('standards');

    /**
     * Holds all of the standards to be displayed
     * @type {Array}
     */
    $scope.standards = [];

    /**
     * Holds any errors
     * @type {Array}
     */
    $scope.errors = [];

    $scope.tests = dataStore.tests;

    $scope.quantity = 5;

    /**
     * Tells whether the form should be shown or not, false means the list of standards should be shown, true means form to add a standard is shown
     * @type {Boolean}
     */
    $scope.formShowing = false;

    $scope.toggleEdit = function(standard) {
      if ($scope.formShowing) {
        $scope.formShowing = false;
        return;
      } else {
        if(standard) {
          standard.editing = true;
          $scope.formShowing = true;
          $scope.standard = standard;
          return;
        } else {
          $scope.standard = null;
          $scope.formShowing = true;
          return;
        }
      }
    };

    $scope.testShowing;

    /**
     * Holds the standard that has been clicked.
     * @type {Array}
     */
    $scope.selectedStandard = null;

    /**
     * Will set a standard to be displayed to the user
     * @param {Object} standard The specificed standard to be displayed
     */
    $scope.setDisplayedStandard = function(standard) {
      $scope.selectedStandard = standard;
    };

    /**
     * Will make a GET request to /api/standards and return an array of standards to be displayed
     */
    $scope.getAll = function() {
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

    /**
     * Will add standard to display, hide the form for adding a standard, and make a POST request to the API to create a new standard
     * @param  {object} standard The specified standard to create
     */
    $scope.createNewStandard = function(standard) {
      var newStandard = copy(standard);
      dataStore.standards.push(newStandard);
      $scope.displayedStandard.splice(0, 1, newStandard);
      Standard.create(newStandard, function(err, data) {
        if (err) {
          return $scope.errors.push({
            'msg': 'There was an error creating your standard'
          });
        }
        $scope.standards.splice($scope.standards.indexOf(newStandard), 1, data);
        $scope.displayedStandard.splice(0, 1, data);
        dataStore.standards.splice(dataStore.standards.indexOf(newStandard), 1, data);

        $scope.formShowing = false;
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

        $scope.standard = null;
        $scope.formShowing = false;
        standard.editing = false;
      });
    };

    /**
     * Will remove standard from display and make delete request to API to remove from database
     * @param  {object} standard The specified standard to delete
     */
    $scope.removeStandard = function(standard) {
      $scope.standards.splice($scope.standards.indexOf(standard), 1);
      dataStore.standards.splice(dataStore.standards.indexOf(standard), 1);

      $scope.displayedStandard = [];
      Standard.remove(standard, function(err) {
        if(err) return $scope.errors.push({
          'msg': 'There was an error deleting this standard'
        });
      });
    };
  }]);
};
