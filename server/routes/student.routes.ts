'use strict';

var studentsController = require('./students/controllers/students_controller');
var goalsController = require('./students/controllers/goals_controller');

var bodyparser = require('body-parser');
var jwtAuth = require('../lib/jwt_auth')(process.env.APP_SECRET);


export = studentRouter;
function studentRouter(router, passport) {
  router.use(bodyparser.json());

  // Signs in a student with their PIN and username
  router.get('/students/sign_in', passport.authenticate('studentBasic', { session: false }), studentsController.signInStudent);

  // Creates a new student
  router.post('/students', jwtAuth, studentsController.createStudent);

  // Gets a specific student from the server based on their ID
  router.get('/students/:studentId', jwtAuth, studentsController.getStudentById);

  // Gets all students for a specific teacher from the server
  router.get('/students', jwtAuth, studentsController.getAllStudents);

  // Updates a student by their ID
  router.put('/students/:studentId', jwtAuth, studentsController.updateStudentById);

  // Removes a student by their id
  router.delete('/students/:studentId', jwtAuth, studentsController.deleteStudentById);

  // Adds the new goal to the student
  router.post('/students/:studentId/goals/', jwtAuth, goalsController.addNewGoal);

  // Updates a students goal by id
  router.put('/students/:studentId/goals', jwtAuth, goalsController.updateStudentGoalById);

  // Deletes/Archives a goal for a student
  router.delete('/students/:studentId/goals/:goalId', jwtAuth, goalsController.archiveGoal);

};
