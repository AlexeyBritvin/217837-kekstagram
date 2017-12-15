'use strict';

(function () {
  var fileUploadInput = document.querySelector('#upload-file');
  var uploadForm = document.querySelector('.upload-form');
  var uploadFormOverlay = uploadForm.querySelector('.upload-overlay');
  var uploadFormCloseIcon = uploadForm.querySelector('.upload-form-cancel');
  var commentField = uploadForm.querySelector('.upload-form-description');
  var imagePreview = uploadForm.querySelector('.effect-image-preview');
  var effectControls = uploadForm.querySelector('.upload-effect-controls');

  var checkCopiesInArray = function (array) {
    for (var i = 0; i < array.length - 1; i++) {
      for (var j = 1; j < array.length; j++) {
        if (array[i].toLowerCase() === array[j].toLowerCase() && i !== j) {
          return false;
        }
      }
    }
    return true;
  };

  var openCustomizeForm = function () {
    uploadFormOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onUploadFormEscPress);
  };

  var closeCustomizeForm = function () {
    uploadFormOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onUploadFormEscPress);
  };

  var onUploadFormEscPress = function (event) {
    if (event.keyCode === window.util.ESC_KEYCODE && document.activeElement !== commentField) {
      closeCustomizeForm();
    }
  };

  fileUploadInput.onchange = openCustomizeForm;
  uploadFormCloseIcon.addEventListener('click', closeCustomizeForm);

  var onEffectControlsCLick = function (event) {
    if (event.target.tagName === 'INPUT') {
      var effectClass = event.target.id.slice(7);
      imagePreview.className = 'effect-image-preview ' + effectClass;
      setSliderDefault();
      getPreviewClass();
    } else {
      return;
    }
  };

  effectControls.addEventListener('click', onEffectControlsCLick, true);

  var resizeControls = uploadForm.querySelector('.upload-resize-controls');
  var resizeIncrement = resizeControls.querySelector('.upload-resize-controls-button-inc');
  var resizeDecrement = resizeControls.querySelector('.upload-resize-controls-button-dec');
  var scale = resizeControls.querySelector('.upload-resize-controls-value');
  var stopSubmit = false;
  var SCALE_STEP = 25;
  var MAX_SCALE = 100;
  var MIN_SCALE = 25;

  var increaseScale = function () {
    scale.value = parseInt(scale.value, 10) + SCALE_STEP + ' %';
    imagePreview.style.transform = 'scale(' + parseInt(scale.value, 10) / 100 + ')';
    return scale.value;
  };

  var decreaseScale = function () {
    scale.value = parseInt(scale.value, 10) - SCALE_STEP + ' %';
    imagePreview.style.transform = 'scale(' + parseInt(scale.value, 10) / 100 + ')';
    return scale.value;
  };

  var onResizeControlsClick = function (event) {
    if (event.target === resizeIncrement && parseInt(scale.value, 10) !== MAX_SCALE) {
      scale.value = increaseScale();
    } else if (event.target === resizeDecrement && parseInt(scale.value, 10) !== MIN_SCALE) {
      scale.value = decreaseScale();
    } else {
      return;
    }
  };

  resizeControls.addEventListener('click', onResizeControlsClick, true);

  var hashtagsInput = uploadForm.querySelector('.upload-form-hashtags');
  var errorMessages = [];

  var validateField = function (input) {
    if (errorMessages.length !== 0) {
      showErrorMessages(input);
      input.classList.add('upload-message-error');
    } else {
      stopSubmit = false;
      deleteErrors(input);
    }
  };

  var validateForm = function (event) {
    if (errorMessages.length !== 0 && stopSubmit === true) {
      event.preventDefault();
    }
  };

  var addErrorMessage = function (message) {
    errorMessages.push(message);
    stopSubmit = true;
  };

  var showErrorMessages = function (input) {
    var errorMessagesHtml = document.createElement('p');
    errorMessagesHtml.classList.add('upload-field-error');
    errorMessagesHtml.innerHTML = errorMessages.join('. <br>');

    if (errorMessages.length !== 0) {
      input.insertAdjacentElement('afterend', errorMessagesHtml);
    }
  };

  var deleteErrors = function (input) {
    errorMessages.length = 0;
    var fieldErrors = uploadForm.querySelectorAll('.upload-field-error');
    if (fieldErrors) {
      for (var i = 0; i < fieldErrors.length; i++) {
        var fieldError = fieldErrors[i];
        fieldError.parentElement.removeChild(fieldError);
      }
    }
    input.classList.remove('upload-message-error');
  };

  var onHashtagsChange = function () {
    var hashtags = hashtagsInput.value.split(' ');
    deleteErrors(hashtagsInput);

    if (hashtags.length > 5) {
      addErrorMessage('Хэштегов не должно быть больше 5');
    }

    if (!checkCopiesInArray(hashtags)) {
      addErrorMessage('Хэштеги должны быть уникальными');
    }

    for (var i = 0; i < hashtags.length; i++) {
      var hashtag = hashtags[i];

      if (hashtag.charAt(0) !== '#') {
        addErrorMessage('Хэштеги должны начинаться со знака #');
      } else if (hashtag.length > 20) {
        addErrorMessage('Длина хэштега не должна превышать 20 символов');
      }
    }
    validateField(hashtagsInput);
  };

  hashtagsInput.addEventListener('change', onHashtagsChange);
  uploadForm.addEventListener('submit', validateForm);

  var slider = uploadForm.querySelector('.upload-effect-level');
  var sliderPin = slider.querySelector('.upload-effect-level-pin');
  var sliderValue = slider.querySelector('.upload-effect-level-value');
  var sliderConnect = slider.querySelector('.upload-effect-level-val');
  var SLIDER_WIDTH = 455;
  var FILTERS = {
    chrome: {
      style: 'grayscale',
      range: [0, 1]
    },
    sepia: {
      style: 'sepia',
      range: [0, 1]
    },
    invert: {
      style: 'invert',
      range: [0, 1],
      percent: true
    },
    blur: {
      style: 'blur',
      range: [0, 3],
      pixels: true
    },
    brightness: {
      style: 'brightness',
      range: [0, 3]
    }
  };

  sliderValue.classList.add('hidden');

  var setSliderDefault = function () {
    sliderPin.style.left = '20%';
    sliderConnect.style.width = '20%';
  };

  var getPreviewClass = function () {
    var filterClass = imagePreview.classList.toString().split(' ')[1];
    var filterName = filterClass.split('-')[1];
    setFilterParameters(FILTERS.filterName);
    if (imagePreview.classList.contains('effect-chrome')) {
      setFilterParameters(FILTERS.chrome);
    } else if (imagePreview.classList.contains('effect-sepia')) {
      setFilterParameters(FILTERS.sepia);
    } else if (imagePreview.classList.contains('effect-marvin')) {
      setFilterParameters(FILTERS.invert);
    } else if (imagePreview.classList.contains('effect-phobos')) {
      setFilterParameters(FILTERS.blur);
    } else if (imagePreview.classList.contains('effect-heat')) {
      setFilterParameters(FILTERS.brightness);
    }
  };

  var dragPin = function (event) {
    event.preventDefault();
    var startCoords = {
      x: event.clientX,
      y: event.clientY
    };

    var onMouseUp = function () {
      slider.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    var onMouseMove = function (mouseEvt) {
      var shift = {
        x: startCoords.x - mouseEvt.clientX,
        y: startCoords.y - mouseEvt.clientY
      };

      startCoords = {
        x: mouseEvt.clientX,
        y: mouseEvt.clientY
      };

      sliderPin.style.left = (sliderPin.offsetLeft - shift.x) / SLIDER_WIDTH * 100 + '%';
      sliderConnect.style.width = sliderPin.style.left;
      sliderValue.value = parseInt(sliderPin.style.left, 10);

      if (parseInt(sliderPin.style.left, 10) < 0) {
        sliderPin.style.left = 0 + '%';
      }
      if (parseInt(sliderPin.style.left, 10) > 100) {
        sliderPin.style.left = 100 + '%';
      }
      // setFilterParameters.updateValue();
    };

    slider.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  sliderPin.addEventListener('mousedown', dragPin);

  var setFilterParameters = function (filter) {
    console.log(filter);
    var range = {
      min: filter.range[0],
      max: filter.range[1]
    };

    var updateValue = function () {
      var value = sliderValue.value / 100 * range.max;

      if (filter.percent === true) {
        value += '%';
      }

      if (filter.pixels === true) {
        value += 'px';
      }
      return value;
    };
    return updateValue();
  };
})();
