'use strict';

var Standard = require('../models/Standard');
var bodyparser = require('body-parser');
var eatAuth = require('../lib/eat_auth')(process.env.APP_SECRET);

module.exports = function(router) {
  router.use(bodyparser.json());

  router.post('/standards', eatAuth, function(req, res) {
    var newStandard = new Standard(req.body);
    newStandard.save(function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }

      res.json(data);
    });
  });

  router.get('/standards', function(req, res) {
    Standard.find({}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }

      res.json(data);
    });
  });

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
};
