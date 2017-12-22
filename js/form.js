'use strict';

(function () {
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
    marvin: {
      style: 'invert',
      range: [0, 1],
      percent: true
    },
    phobos: {
      style: 'blur',
      range: [0, 3],
      pixels: true
    },
    heat: {
      style: 'brightness',
      range: [0, 3]
    }
  };
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

  fileUploadInput.addEventListener('change', openCustomizeForm);
  uploadFormCloseIcon.addEventListener('click', closeCustomizeForm);

  var resizeControls = uploadForm.querySelector('.upload-resize-controls');
  var hashtagsInput = uploadForm.querySelector('.upload-form-hashtags');
  var stopSubmit = false;
  var errorMessages = [];

  var changeImageEffect = function (eventTarget) {
    if (eventTarget.tagName === 'INPUT') {
      var effectClass = eventTarget.id.slice(7);
      imagePreview.className = 'effect-image-preview ' + effectClass;
      setSliderDefault();
      showSlider();
    }
  };

  var changeImageScale = function (scale) {
    imagePreview.style.transform = 'scale(' + scale / 100 + ')';
  };

  window.initFilters(effectControls, changeImageEffect);
  window.initScale(resizeControls, changeImageScale);

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

  slider.classList.add('hidden');
  sliderValue.classList.add('hidden');

  var setSliderDefault = function () {
    sliderPin.style.left = '20%';
    sliderConnect.style.width = '20%';
    sliderValue.value = 20;
    imagePreview.style.filter = '';
  };

  var getPreviewClass = function () {
    var filterClass = imagePreview.classList.toString().split(' ')[1];
    if (filterClass) {
      var filterName = filterClass.split('-')[1];
    }
    return filterName;
  };

  var showSlider = function () {
    var filterName = getPreviewClass();
    if (filterName !== 'none') {
      slider.classList.remove('hidden');
    } else {
      slider.classList.add('hidden');
    }
  };

  var onPinMouseDown = function (event) {
    event.preventDefault();
    var startCoords = {
      x: event.clientX,
      y: event.clientY
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onPinMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    var onPinMouseMove = function (mouseEvt) {
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
      updateSlider();
    };

    document.addEventListener('mousemove', onPinMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  sliderPin.addEventListener('mousedown', onPinMouseDown);

  var updateSlider = function () {
    var filterName = getPreviewClass();
    var filter = FILTERS[filterName];
    var value = sliderValue.value / 100 * filter.range[1];

    if (filter.percent === true) {
      value = value * 100 + '%';
    }

    if (filter.pixels === true) {
      value += 'px';
    }
    imagePreview.style.filter = filter.style + '(' + value + ')';
  };

  var sendFormData = function () {
    uploadFormOverlay.classList.add('hidden');
    uploadForm.reset();
    imagePreview.className = 'effect-image-preview effect-none';
    imagePreview.removeAttribute('style');
    slider.classList.add('hidden');
  };

  var onUploadFormSubmit = function (event) {
    if (stopSubmit !== true) {
      event.preventDefault();
      var formData = new FormData(uploadForm);
      window.backend.save(formData, sendFormData, window.onError);
    }
  };

  uploadForm.addEventListener('submit', onUploadFormSubmit);
})();
