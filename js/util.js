'use strict';
(function () {
  const KEY_ENTER = `Enter`;
  const KEY_ESCAPE = `Escape`;

  window.util = {
    randomInteger(min, max) {
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    },

    getRandomItemArray(array) {
      const itemArray = array[window.util.randomInteger(0, array.length - 1)];
      return itemArray;
    },

    isEnterEvent(evt, action) {
      if (evt.key === KEY_ENTER) {
        action();
      }
    },

    isEscapeEvent(evt, action) {
      if (evt.key === KEY_ESCAPE) {
        action();
      }
    }
  };
})();
