/**
 * The routes for all CRUD actions for Standards and Goals on Standards
 * For use in the Prog Check Testing application
 * Created by Jonathan Ullberg on 10/28/2015
 */
'use strict';

var Standard = require('../models/Standard');
var bodyparser = require('body-parser');
var eatAuth = require('../lib/eat_auth')(process.env.APP_SECRET);

module.exports = function(router) {
  router.use(bodyparser.json());

  /**
   * Gets all standards
   */
  router.get('/standards', function(req, res) {
    Standard.find({}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }

      res.json({
        'standards': data
      });
    });
  });

  /**
   * Reads a specific standard
   */
  router.get('/standards/:id', eatAuth, function(req, res) {
    Standard.findById(req.params.id, function(err, standard) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }
      res.json({
        standard: standard
      });
    });
  });

  /**
   * Creates a new standard
   */
  router.post('/standards', eatAuth, function(req, res) {
    var newStandard = new Standard(req.body);
    newStandard.save(function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }

      res.json({
        'standard': data
      });
    });
  });
  /**
   * Updates a specific standard
   */
  router.put('/standards/:id', eatAuth, function(req, res) {
    var updatedStandard = req.body;
    delete updatedStandard._id;
    Standard.update({_id: req.params.id},
      updatedStandard, function(err) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            'msg': 'Internal Server Error'
          });
        }

        res.json({
          'msg': 'Success'
        });
      });
  });

  /**
   * Deletes a specific standard
   */
  router.delete('/standards/:id', eatAuth, function(req, res) {
    Standard.remove({'_id': req.params.id}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }

      res.json({
        'msg': 'Success'
      });
    });
  });

  /**
   * Creates a goal for a specific standard
   */
  router.post('/standards/:standardId/goals', eatAuth, function(req, res) {
    var newGoal = req.body;
    Standard.findById(req.params.standardId, function(err, standard) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }
      if (standard.goals && Array.isArray(standard.goals)) {
        standard.goals.push(newGoal);
        standard.save(function(err, data) {
          if (err) {
            console.log(err);
            return res.status(500).json({
              'msg': 'Internal Server Error'
            });
          }
          res.json({
            'standard': data
          });
        });
      }
    });
  });

  /**
   * Updates a specific goal on a standard
   */
  router.put('/standards/:standardId/goals/:goalId', eatAuth, function(req, res) {
    var goal = req.body;
    Standard.update({
      '_id': req.params.standardId,
      'goals._id': req.params.goalId},
      {$set: { 'goals.$': goal}},
      function(err, standard) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            'msg': 'Internal Server Error'
          });
        }
        res.json({
          'msg': 'Success'
        });
    });
  });

  /*
   * Deletes a specific goal from a standard
   */
  router.delete('/standards/:standardId/goals/:goalId', eatAuth, function(req, res) {
    Standard.findById(req.params.standardId, function(err, standard) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }
      standard.goals = standard.goals.filter(function(goal) {
        if (goal._id != req.params.goalId) {
          return goal;
        }
      });
      standard.save(function(err, data) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            'msg': 'Internal Server Error'
          });
        }
        res.json({
          'standard': data
        });
      });
    });
  });
};
