'use strict';

module.exports = function(app) {
  app.controller('BugFormCtrl', ['$scope', '$rootScope', '$modal', '$modalInstance', 'RESTResource', 'Errors', function($scope, $rootScope, $modal, $modalInstance, resource, Errors) {
    var Bugs = resource('bugs');
    $scope.submitBug = function(bugReport) {
      if ($scope.bugForm.$valid) {
        Bugs.create(bugReport, function(err, data) {
          if (err) {
            Errors.addError({
              'msg': 'There was an error creating the bug report'
            });
          }

          $modalInstance.close();
          var controller = ['$scope', '$modalInstance', function($scope, $modalInstance) {
            $scope.dismiss = function() {
              $modalInstance.dismiss();
            };
          }];
          var scope = $rootScope.$new();
          scope.params = {
            header: 'Thanks for reporting',
            message: 'We will make sure to take a look into the problem and fix it soon.'
          };
          $modal.open({
            animation:true,
            templateUrl: '/templates/modals/message.html',
            size:'lg',
            controller: controller,
            scope: scope
          });
        });
      }
    };

    $scope.dismiss = function() {
      $modalInstance.dismiss();
    };
  }]);
};
