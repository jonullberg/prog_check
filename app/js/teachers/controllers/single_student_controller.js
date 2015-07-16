'use strict';

module.exports = function(app) {
  app.controller('singleStudentCtrl', ['$scope', '$routeParams', '$modal', 'dataStore', function($scope, $routeParams, $modal, dataStore) {
    $scope.student;
    $scope.getStudent = function() {
      var id = $routeParams.studentId;
      dataStore.getStudent(id, function(err, data) {
        if (err) {
          console.log(err);
          return;
        }
        $scope.student = data[0];
      });
    };

    $scope.openGoalForm = function() {
      $modal.open({
        animation: true,
        templateUrl: '/templates/directives/standards/standards_list.html',
        controller: 'standardsListCtrl',
        size: 'lg'
      });
    };

  }]);
};
