'use strict';
var studentsController = require('./students/controllers/students_controller');
var goalsController = require('./students/controllers/goals_controller');
var bodyparser = require('body-parser');
var jwtAuth = require('../lib/jwt_auth')(process.env.APP_SECRET);
function studentRouter(router, passport) {
    router.use(bodyparser.json());
    router.get('/students/sign_in', passport.authenticate('studentBasic', { session: false }), studentsController.signInStudent);
    router.post('/students', jwtAuth, studentsController.createStudent);
    router.get('/students/:studentId', jwtAuth, studentsController.getStudentById);
    router.get('/students', jwtAuth, studentsController.getAllStudents);
    router.put('/students/:studentId', jwtAuth, studentsController.updateStudentById);
    router.delete('/students/:studentId', jwtAuth, studentsController.deleteStudentById);
    router.post('/students/:studentId/goals/', jwtAuth, goalsController.addNewGoal);
    router.put('/students/:studentId/goals', jwtAuth, goalsController.updateStudentGoalById);
    router.delete('/students/:studentId/goals/:goalId', jwtAuth, goalsController.archiveGoal);
}
;
module.exports = studentRouter;
