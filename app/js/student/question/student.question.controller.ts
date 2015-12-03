/**
 * The controller for a students question
 * For use in the Prog Check testing application
 * Created by Jonathan Ullberg on 10/03/2015
 * /app/js/student/question/student.question.controller.ts
 */
'use strict';

export = function(app: any) {
  app.controller('QuestionCtrl', ['$sce', questionCtrl]);
};

function questionCtrl($sce: any) {
  var qu = this;
  qu.trustAsHtml = $sce.trustAsHtml;

  qu.select = function(answer: string, $index: number) {
    qu.question.selectedIndex = $index;
    qu.selectAnswer({
      answer: answer
    });
  };
}