'use strict';

var rootUrl = process.env.NODE_ENV === 'production' ?
  'https://www.progcheck.com' :
  'https://www.progcheck.com';

module.exports = function(token) {
  return '<h1>Prog Check Password Reset Request</h1><p>Someone has requested a password reset for this email account on ' + rootUrl + '</p><p>If this was not you, do not worry. Simply ignore this email and your email and password are secure.<br />If this was you, please follow these instructions:</p><ol><li>Go to <a href="' + rootUrl + '">Prog Check</a></li><li>Copy and past this link in your browser</li><a ref="nofollow">' + rootUrl + '/#/reset/' + encodeURIComponent(token) + '</a><li><br />Follow the instructions to reset your password.</li><li>If you do not get to a reset password form, keep putting this link in your browser.</li></p><p>Thank you for using Prog Check</p>';
}
