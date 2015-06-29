'use strict';

module.exports = function(app) {
  app.controller('standardsController', ['$scope', 'RESTResource', 'copy', function($scope, resource, copy) {

    /**
     * Tells whether the form should be shown or not, false means the list of standards should be shown, true means form to add a standard is shown
     * @type {Boolean}
     */
    $scope.formShowing = false;

    /**
     * Calls on our REST resource to hit the API at /api/standards
     * @type {[type]}
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

    /**
     * Will make a GET request to /api/standards and return an array of standards to be displayed
     */
    $scope.getAll = function() {
      Standard.getAll(function(err, data) {
        if (err) {
          return $scope.errors.push({'msg': 'Error retrieving food items'});
        }
        $scope.standards = data;
      });
    };


    $scope.showForm = function() {
      if($scope.formShowing) {
        $scope.formShowing = false;
        return;
      }
      $scope.formShowing = true;
    };

    $scope.createNewStandard = function(standard) {
      var newStandard = copy(standard);
      $scope.standards.push(newStandard);

      Standard.create(newStandard, function(err, data) {
        if (err) {
          return $scope.errors.push({
            'msg': 'There was an error creating your standard'
          });
        }
        $scope.standards.splice($scope.standards.indexOf(newStandard), 1, data);
        $scope.formShowing = false;
      });
    };
  }]);
};
