'use strict';

(function () {
  var DEBOUNCE_TIMER = 500; // ms
  var pictures = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var errorsContainer = document.querySelector('.errors-overlay');
  var errorsCloseIcon = errorsContainer.querySelector('.upload-errors-cancel');
  var errorText = errorsContainer.querySelector('.upload-errors-text');
  var filters = document.querySelector('.filters');
  var photos = [];

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
    data.forEach(function (item) {
      fragment.appendChild(window.renderPicture(item));
    });

    photos = data;
    pictures.appendChild(fragment);
    filters.classList.remove('filters-inactive');
    updatePhotos();
  };

  window.onError = function (error) {
    openErrorsContainer();
    errorText.textContent = error;
  };

  window.backend.load(getData, window.onError);

  pictures.addEventListener('click', window.preview.onPictureClick, true);
  errorsCloseIcon.addEventListener('click', onErrorsCloseIconClick);

  var cleanGallery = function () {
    while (pictures.firstChild) {
      pictures.removeChild(pictures.firstChild);
    }
  };

  var appendRenderPhotos = function (array) {
    array.forEach(function (item) {
      fragment.appendChild(window.renderPicture(item));
    });
  };

  var updatePhotos = function () {
    var defaultFilter = document.querySelector('#filter-recommend');
    var likesFilter = document.querySelector('#filter-popular');
    var discussedFilter = document.querySelector('#filter-discussed');
    var randomFilter = document.querySelector('#filter-random');
    var mostLiked = photos.slice();
    var mostCommented = photos.slice();
    var randomPhotos = photos.slice();

    var likesCompanator = function (a, b) {
      return a.likes > b.likes ? -1 : 1;
    };

    var commentsCompanator = function (a, b) {
      return a.comments.length > b.comments.length ? -1 : 1;
    };

    var randomCompanator = function () {
      return Math.random() - 0.5;
    };

    var sortBy = function (array, companator) {
      if (typeof companator !== 'undefined') {
        array.sort(companator);
      }

      appendRenderPhotos(array);

      cleanGallery();
      pictures.appendChild(fragment);
    };

    var sortByLikes = function () {
      sortBy(mostLiked, likesCompanator);
    };

    var setDefault = function () {
      sortBy(photos);
    };

    var sortByComments = function () {
      sortBy(mostCommented, commentsCompanator);
    };

    var showRandom = function () {
      sortBy(randomPhotos, randomCompanator);
    };

    var onDefaultFilterClick = function () {
      window.util.debounce(setDefault, DEBOUNCE_TIMER);
    };

    var onLikesFilterClick = function () {
      window.util.debounce(sortByLikes, DEBOUNCE_TIMER);
    };

    var onDiscussedFilterClick = function () {
      window.util.debounce(sortByComments, DEBOUNCE_TIMER);
    };

    var onRandomFilterClick = function () {
      window.util.debounce(showRandom, DEBOUNCE_TIMER);
    };

    defaultFilter.addEventListener('click', onDefaultFilterClick);
    likesFilter.addEventListener('click', onLikesFilterClick);
    discussedFilter.addEventListener('click', onDiscussedFilterClick);
    randomFilter.addEventListener('click', onRandomFilterClick);
  };
})();
