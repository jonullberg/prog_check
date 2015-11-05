/**
 * For use in the Prog Check testing application
 * A module to store a students test data
 * Created by Jonathan Ullberg on 10/23/2015
 */
'use strict';

module.exports = function(app) {
  app.factory('StudentTestData', ['$http', '$rootScope', 'Errors', 'RESTResource', function ($http, $rootScope, Errors, resource) {
    var Tests = resource('tests');
    var studentTestData = {
      tests: [],
      test: null,
      attempt: null
    };

    return studentTestData;
  }])
}
