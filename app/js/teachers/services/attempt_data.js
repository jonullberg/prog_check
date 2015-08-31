'use strict';

module.exports = function(app) {
  app.factory('Attempts', ['$rootScope', '$http', 'RESTResource', 'Errors', function($rootScope, $http, resource, Errors) {
    var Attempts = resource('tests/attempts')
    var attemptData = {
      attempt: null,
      attempts: [],
      getAttempts: function(student, cb) {
        $http.get('/api/tests/attempts/' + student._id)
          .then(function(res) {
            this.attempts = res.data;
            console.log(this.attempts);
            cb(res.data);
          }.bind(this))
          .catch(function(e) {
            if (e) {
              return Errors.addError({
                'msg': 'There was an error getting that students attempts. Please log-out, log back in and try again. If the problem persists, please send a bug report and we will fix it as soon as possible.'
              });
            }
          })
          .finally(function(res, e) {
            console.log(res);
            console.log(e);
          });
      }
    }

    return attemptData;
  }])
}
