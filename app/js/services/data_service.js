'use strict';

module.exports = function(app) {
  app.factory('dataStore', function() {
    return {
      standards: [],

      tests: [],

      questions: []

    };
  });
};
