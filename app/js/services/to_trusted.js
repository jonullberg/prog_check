'use strict';

module.exports = function(app) {
  app.filter('to_trusted', ['$sce', function($sce) {
    return function(text) {
      return $sce.trustAsHtml(text);
    };
  }]);
};
