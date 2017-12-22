'use strict';

(function () {
  var gallery = document.querySelector('.gallery-overlay');
  var galleryImage = gallery.querySelector('.gallery-overlay-image');
  var galleryLikes = gallery.querySelector('.likes-count');
  var galleryComments = gallery.querySelector('.comments-count');
  var galleryCloseIcon = gallery.querySelector('.gallery-overlay-close');

  window.preview = {
    onPictureClick: function (event) {
      event.preventDefault();
      var picture = event.target.closest('.picture');

      if (picture) {
        openGallery();
        galleryImage.setAttribute('src', picture.querySelector('img').getAttribute('src'));
        galleryLikes.textContent = picture.querySelector('.picture-likes').textContent;
        galleryComments.textContent = picture.querySelector('.picture-comments').textContent;
      }
    }
  };

  var openGallery = function () {
    gallery.classList.remove('hidden');
    gallery.focus();
    galleryCloseIcon.addEventListener('keydown', onGalleryCloseIconEnterPress);
    document.addEventListener('keydown', onGalleryEscPress);
  };

  var closeGallery = function () {
    gallery.classList.add('hidden');
    galleryCloseIcon.removeEventListener('keydown', onGalleryCloseIconEnterPress);
    document.removeEventListener('keydown', onGalleryEscPress);
  };

  var onGalleryEscPress = function (event) {
    window.util.isEscEvent(event, closeGallery);
  };

  var onGalleryCloseIconClick = function () {
    closeGallery();
  };

  var onGalleryCloseIconEnterPress = function (event) {
    window.util.isEnterEvent(event, closeGallery);
  };

  galleryCloseIcon.addEventListener('click', onGalleryCloseIconClick);
})();
