'use strict';

var Standard = require('../models/Standard');
var bodyparser = require('body-parser');

module.exports = function(router) {
  router.use(bodyparser.json());

  router.post('/standards', function(req, res) {
    var newStandard = new Standard(req.body);
    newStandard.save(function(err, standard) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }
      res.json({
        'msg': 'Successfully saved standard'
      });
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
};
