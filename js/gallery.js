'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var errorsContainer = document.querySelector('.errors-overlay');
  var errorsCloseIcon = errorsContainer.querySelector('.upload-errors-cancel');
  var errorText = errorsContainer.querySelector('.upload-errors-text');

  var openErrorsContainer = function () {
    errorsContainer.classList.remove('hidden');
    document.addEventListener('keydown', onErrorsEscPress);
  };

  var closeErrorsContainer = function () {
    errorsContainer.classList.add('hidden');
    document.removeEventListener('keydown', onErrorsEscPress);
  };

  var onErrorsEscPress = function (event) {
    window.util.isEscEvent(event, closeErrorsContainer);
  };

  var onErrorsCloseIconClick = function () {
    closeErrorsContainer();
  };

  var getData = function (data) {
    for (var j = 0; j < data.length; j++) {
      fragment.appendChild(window.renderPicture(data[j]));
    }

    pictures.appendChild(fragment);
  };

  window.onError = function (error) {
    openErrorsContainer();
    errorText.textContent = error;
  };

  window.backend.load(getData, window.onError);

  pictures.addEventListener('click', window.preview.onPictureClick, true);
  errorsCloseIcon.addEventListener('click', onErrorsCloseIconClick);
})();
