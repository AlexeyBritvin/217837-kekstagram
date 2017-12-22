'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var prevTimer;

  window.util = {
    isEscEvent: function (event, action) {
      if (event.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (event, action) {
      if (event.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    debounce: function (action, timer) {
      if (prevTimer) {
        clearTimeout(prevTimer);
      }
      prevTimer = setTimeout(action, timer);
    }
  };
})();
