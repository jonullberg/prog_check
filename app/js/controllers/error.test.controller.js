'use strict';

module.exports = function(app) {
  app.controller('ErrorTestCtrl', ['$scope', errorsTestCtrl]);
};

function errorsTestCtrl($scope) {
  $scope.causeError = function() {
    foo();
  }
  function foo() {
    bar();
  }
  function bar() {
    var x = y;
  }

}
