'use strict';

module.exports = function(app) {
  app.factory('SanitizeFractions', function() {
    return {
      sanitize: function(question) {
        var createFracHTML = function(text) {
          var arr = text.split(/<\/?frac>/);
          var num;
          var frac;
          if (arr.length > 1) {
            for (var i = 1; i < arr.length; i += 2) {
              num = arr[i].split(' ');
              if (num.length > 1) {
                frac = num[1].split('/');
                arr[i] = '<span class=\"frac-whole\">' + num[0] + '</span><span class=\"frac\"><sup>' + frac[0] + '</sup><span>/</span><sub>' + frac[1] + '</sub></span>';
              } else {
                frac = num[0].split('/');
                arr[i] = '<span class=\"frac\"><sup>' + frac[0] + '</sup><span>/</span><sub>' + frac[1] + '</sub></span>';
              }

            }
            text = arr.join('');
          }

          return text;
        };
        question.question = createFracHTML(question.question);
        question.correct = createFracHTML(question.correct);
        for (var i = 0; i < question.answers.length; i++) {
          question.answers[i] = createFracHTML(question.answers[i]);
        }

        return question;
      }
    };
  });
};
