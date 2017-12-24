'use strict';

(function () {
  window.initFilters = function (element, action) {
    var doAction = function (event) {
      action(event.target);
    };

    var onElementClick = function (event) {
      doAction(event);
    };

    element.addEventListener('click', onElementClick);
  };
})();
