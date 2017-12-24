'use strict';

(function () {
  var SCALE_STEP = 25;
  var MAX_SCALE = 100;
  var MIN_SCALE = 25;

  window.initScale = function (scaleElement, changeScale) {
    var increment = scaleElement.querySelector('.upload-resize-controls-button-inc');
    var decrement = scaleElement.querySelector('.upload-resize-controls-button-dec');
    var scale = scaleElement.querySelector('.upload-resize-controls-value');

    var increaseScale = function () {
      if (parseInt(scale.value, 10) !== MAX_SCALE) {
        scale.value = parseInt(scale.value, 10) + SCALE_STEP + ' %';
        var scaleValue = parseInt(scale.value, 10);
      }
      if (typeof changeScale === 'function') {
        changeScale(scaleValue);
      }
    };

    var decreaseScale = function () {
      if (parseInt(scale.value, 10) !== MIN_SCALE) {
        scale.value = parseInt(scale.value, 10) - SCALE_STEP + ' %';
        var scaleValue = parseInt(scale.value, 10);
      }
      if (typeof changeScale === 'function') {
        changeScale(scaleValue);
      }
    };

    var onIncrementClick = function () {
      increaseScale();
    };

    var onDecrementClick = function () {
      decreaseScale();
    };

    increment.addEventListener('click', onIncrementClick);
    decrement.addEventListener('click', onDecrementClick);
  };
})();
