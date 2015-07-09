'use strict';

module.exports = function(app) {
  app.factory('_', ['$window', function($window) {
    return $window._;
  }]);
};
