'use strict';
module.exports = function (app) {
    app.factory('AdminTeachersData', ['$http', '$rootScope', 'Errors', function ($http, $rootScope, Errors) {
            var adminTeachersData = {
                teachers: null,
                teacher: null,
                getTeachers: function () {
                    return this.teachers;
                },
                setTeachers: function (teachers) {
                    this.teachers = teachers;
                    $rootScope.$broadcast('teachers:changed', this.teachers);
                    return;
                },
                fetchTeachers: fetchTeachers,
                updateTeacher: updateTeacher
            };
            function fetchTeachers(cb) {
                $http.get('/api/users')
                    .then(function (response) {
                    this.setTeachers(response.data.users);
                    handleCallback(cb, response, null);
                }.bind(this))
                    .catch(function (rejection) {
                    handleCallback(cb, null, rejection);
                    return Errors.addError({
                        'msg': 'There was an error fetching the teachers from the server. Please log out, refresh and try again. If it persists, please create a bug report so we can fix it.'
                    });
                });
            }
            function updateTeacher(teacher, cb) {
                $http.put('/api/users/' + teacher._id, teacher)
                    .then(function (response) {
                    this.teachers.splice(this.teachers.indexOf(teacher), 1, response.data.teacher);
                    $rootScope.$broadcast('teachers:changed');
                    handleCallback(cb, response, null);
                }.bind(this))
                    .catch(function (rejection) {
                    handleCallback(cb, null, rejection);
                    return Errors.addError({
                        'msg': 'There was an error saving that teacher on the server. Please log out, refresh and try again. If it persists, please create a bug report so we can fix it.'
                    });
                });
            }
            function handleCallback(cb, response, rejection) {
                if (cb && typeof cb === 'function') {
                    if (response) {
                        return cb(null, response.data);
                    }
                    cb(rejection);
                }
            }
            return adminTeachersData;
        }]);
};
