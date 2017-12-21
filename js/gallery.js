'use strict';

(function () {
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
    for (var j = 0; j < data.length; j++) {
      fragment.appendChild(window.renderPicture(data[j]));
    }

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

  var updatePhotos = function () {
    var defaultFilter = document.querySelector('#filter-recommend');
    var likesFilter = document.querySelector('#filter-popular');
    var discussedFilter = document.querySelector('#filter-discussed');
    var randomFilter = document.querySelector('#filter-random');
    var mostLiked = photos.slice();
    var mostCommented = photos.slice();
    var randomPhotos = photos.slice();

    var sortByLikes = function () {
      mostLiked.sort(function (a, b) {
        if (a.likes > b.likes) {
          return -1;
        } else {
          return 1;
        }
      });

      mostLiked.forEach(function (item) {
        fragment.appendChild(window.renderPicture(item));
      });

      cleanGallery();
      pictures.appendChild(fragment);
    };

    var setDefault = function () {
      photos.forEach(function (photo) {
        fragment.appendChild(window.renderPicture(photo));
      });

      cleanGallery();
      pictures.appendChild(fragment);
    };

    var sortByComments = function () {
      mostCommented.sort(function (a, b) {
        if (a.comments.length > b.comments.length) {
          return -1;
        } else {
          return 1;
        }
      });

      mostCommented.forEach(function (item) {
        fragment.appendChild(window.renderPicture(item));
      });

      cleanGallery();
      pictures.appendChild(fragment);
    };

    var showRandom = function () {
      var getRandom = function () {
        var num = Math.floor(Math.random() * randomPhotos.length);
        return num;
      };

      for (var i = 0; i < randomPhotos.length; i++) {
        var num = getRandom();
        fragment.appendChild(window.renderPicture(randomPhotos[num]));
      }

      cleanGallery();
      pictures.appendChild(fragment);
    };

    var prevTimer;
    var DEBOUNCE_TIMER = 500; // ms
    var debounce = function (action) {
      clearTimeout(prevTimer);
      prevTimer = setTimeout(action, DEBOUNCE_TIMER);
    };

    var onDefaultFilterClick = function () {
      debounce(setDefault);
    };

    var onLikesFilterClick = function () {
      debounce(sortByLikes);
    };

    var onDiscussedFilterClick = function () {
      debounce(sortByComments);
    };

    var onRandomFilterClick = function () {
      debounce(showRandom);
    };

    defaultFilter.addEventListener('click', onDefaultFilterClick);
    likesFilter.addEventListener('click', onLikesFilterClick);
    discussedFilter.addEventListener('click', onDiscussedFilterClick);
    randomFilter.addEventListener('click', onRandomFilterClick);
  };
})();
