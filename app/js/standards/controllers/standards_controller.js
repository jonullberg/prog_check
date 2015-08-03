'use strict';

module.exports = function(app) {
  app.controller('standardsCtrl', ['$scope', '$filter', '$modal', '$rootScope', 'copy', 'Errors', 'Standards', 'pcGrades', function($scope, $filter, $modal, $rootScope, copy, Errors, Standards, pcGrades) {

    $scope.formShowing = false;
    $scope.isStandardShowing;
    $scope.isStandardFormShowing;
    $scope.isTestShowing = false;
    $scope.isTestFormShowing = false;
    $scope.isAlertShown = false;

    /**
     * On event 'standard:changed' sets scope to model
     */
    $scope.$on('standard:changed', function() {
      $scope.standard = Standards.getStandard();
    });


    $scope.addStandard = function() {
      $scope.isStandardFormShowing = !$scope.isStandardFormShowing;
    };

    $scope.toggleTestForm = function() {
      $scope.isTestFormShowing = !$scope.isTestFormShowing;
    };

    $scope.editStandard = function(standard) {
      var scope = $rootScope.$new();
      scope.params = {
        buttonText: 'Save Standard',
        standard: standard
      };
      $modal.open({
        animation:true,
        templateUrl:'/templates/directives/standard_form.html',
        size: 'lg',
        controller: 'StandardFormCtrl',
        scope: scope
      });
    };

    var toggleSingleStandard = function() {
      $scope.isStandardShowing = !$scope.isStandardShowing;
    };

    /**
     * Will set a standard to be displayed to the user
     * @param {Object} standard The specificed standard to be displayed
     */
    $scope.showStandard = function() {
      if (!$scope.isStandardShowing) {
        toggleSingleStandard();
      }
    };

    $scope.hideStandard = function() {
      if ($scope.isStandardShowing) {
        toggleSingleStandard();
      }
    };

    ////////////////////
    // Delete this??? //
    ////////////////////
    /**
     * Will add standard to display, hide the form for adding a standard, and make a POST request to the API to create a new standard
     * @param  {object} standard The specified standard to create
     */
    // $scope.createNewStandard = function(standard) {
    //   var newStandard = angular.copy(standard);
    //   Standards.standards.push(newStandard);
    //   $scope.standard = newStandard;
    //   Standard.create(newStandard, function(err, data) {
    //     if (err) {
    //       return Errors.addError({
    //         'msg': 'There was an error creating your standard'
    //       });
    //     }
    //     $scope.standards.splice($scope.standards.indexOf(newStandard), 1, data);
    //     $scope.standard = data;
    //     Standards.standards.splice(Standards.standards.indexOf(newStandard), 1, data);

    //     $scope.isStandardFormShowing = false;
    //   });
    // };


    ////////////////////
    // DELETE THIS??? //
    ////////////////////
    /**
     * Will update a standard on the client and make a PUT request to the server to update the standard
     * @param  {object} standard The specified standard to update
     */
    // $scope.saveStandard = function(standard) {
    //   Standard.save(standard, function(err, data) {
    //     if (err) return Errors.addError({
    //       'msg': 'There was an error while updating this standard'
    //     });
    //     standard.editing = false;
    //     $scope.standard = standard;
    //   });
    // };

    // Tests Controller
    // TODO: refactor into its own controller






    $scope.toggleSingleTest = function() {
      $scope.isTestShowing = !$scope.isTestShowing;
    };

  }]);
};
