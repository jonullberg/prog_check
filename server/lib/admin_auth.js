'use strict';

module.exports = function() {
  return function(req, res, next) {
    if (req.user.role !== 'admin') {
      console.log('User is not an admin');
      return res.status(401).json({
        'msg': 'Not Authorized'
      });
    }
    next();
  };
};
