'use strict';

(function () {
  var fileUploadInput = document.querySelector('#upload-file');
  var uploadForm = document.querySelector('.upload-form');
  var uploadFormOverlay = uploadForm.querySelector('.upload-overlay');
  var uploadFormCloseIcon = uploadForm.querySelector('.upload-form-cancel');
  var commentField = uploadForm.querySelector('.upload-form-description');
  var imagePreview = uploadForm.querySelector('.effect-image-preview');
  var effectControls = uploadForm.querySelector('.upload-effect-controls');
  var uploadFormSubmit = uploadForm.querySelector('.upload-form-submit');
  var ESC_KEYCODE = 27;

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
    if (event.keyCode === ESC_KEYCODE && document.activeElement !== commentField) {
      closeCustomizeForm();
    }
  };

  fileUploadInput.onchange = openCustomizeForm;
  uploadFormCloseIcon.addEventListener('click', closeCustomizeForm);

  var onEffectControlsCLick = function (event) {
    if (event.target.tagName === 'INPUT') {
      var effectClass = event.target.id.slice(7);
      imagePreview.className = 'effect-image-preview ' + effectClass;
    } else {
      return;
    }
  };

  effectControls.addEventListener('click', onEffectControlsCLick, true);

  var resizeControls = uploadForm.querySelector('.upload-resize-controls');
  var resizeIncrement = resizeControls.querySelector('.upload-resize-controls-button-inc');
  var resizeDecrement = resizeControls.querySelector('.upload-resize-controls-button-dec');
  var scale = resizeControls.querySelector('.upload-resize-controls-value');
  var SCALE_STEP = 25;
  var MAX_SCALE = 100;
  var MIN_SCALE = 25;
  var stopSubmit = false;

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
})();
