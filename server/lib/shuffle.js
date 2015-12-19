'use strict';

function shuffle(arr) {
  var currentIndex = arr.length;
  var tempVal;
  var randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    tempVal = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = tempVal;
  }
  return arr;
}

module.exports = shuffle;
