'use strict';

module.exports = function(app) {
  app.directive('pcCreateStandard', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/create_standard.html',
      controller: ['$scope', 'RESTResource', function($scope, resource) {

        $scope.formShowing = false;

        var Standard = resource('standards');


        $scope.standards = [];

        $scope.getAll = function() {
          Standard.getAll(function(err, data) {
            if (err) {
              return $scope.errors.push({'msg': 'Error retrieving food items'});
            }
            $scope.standards = data;
            console.log($scope.standards);
          });
        };

        $scope.showForm = function() {
          if($scope.formShowing) {
            $scope.formShowing = false;
            return;
          }
          $scope.formShowing = true;
        };
      }]
    };
  });
};
