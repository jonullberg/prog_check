var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .factory('StudentData', ['$rootScope', '$http', 'Errors', 'StudentTestData', studentData]);
    function studentData($rootScope, $http, Errors, Tests) {
        return {
            student: null,
            Tests: Tests,
            getStudent: function getStudent() {
                return this.student;
            },
            setStudent: function setStudent(student) {
                this.student = student;
                return $rootScope.$broadcast('student:changed', this.student);
            },
            fetchStudent: fetchStudent
        };
        function fetchStudent(studentId, cb) {
            $http.get('/api/students/' + studentId)
                .then(function handleSuccess(response, cb) {
                this.setStudent(response.data.student);
                handleCallback(null, response, cb);
            }.bind(this))
                .catch(function handleRejection(rejection) {
                handleCallback(rejection, null, cb);
                return Errors.addError({
                    'msg': 'There was an error fetching your profile from the server.'
                });
            }.bind(this));
        }
        function handleCallback(rejection, response, cb) {
            if (typeof cb === 'function') {
                if (rejection) {
                    return cb(rejection);
                }
                cb(null, response.data);
            }
        }
    }
})(ProgCheck || (ProgCheck = {}));
