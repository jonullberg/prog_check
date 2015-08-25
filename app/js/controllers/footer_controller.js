'use strict';

module.exports = function(app) {
  app.controller('FooterCtrl', ['$scope', '$modal', function($scope, $modal) {
    $scope.bugModal = function() {
      $modal.open({
        animation:true,
        templateUrl: '/templates/directives/bug_form.html',
        size:'lg',
        controller: 'BugFormCtrl'
      });
    };
  }]);
};
