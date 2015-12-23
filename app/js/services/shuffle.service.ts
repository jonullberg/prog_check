module ProgCheck {
  'use strict';

  angular.module('progCheck')
    .factory('shuffle', shuffle)
  function shuffle() {
    function shuffleArray(array) {
      var currentIndex = array.length;
      var temporaryValue;
      var randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    return {
      shuffle: shuffleArray
    };
  }

}
