'use strict';

module.exports = function(app) {
  app.factory('dataStore',['$rootScope', 'RESTResource', function($rootScope, resource) {
    var Students = resource('students');
    var Standards = resource('standards');
    var Tests = resource('tests');

    return dataStore;

  }]);
};
