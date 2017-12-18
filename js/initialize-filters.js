'use strict';

(function () {
  window.initFilters = function (element, action) {
    var doAction = function (event) {
      action(event.target);
    };

    element.addEventListener('click', doAction);
  };
})();
