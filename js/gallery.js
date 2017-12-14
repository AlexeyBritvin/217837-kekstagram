'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < window.data.length; j++) {
    fragment.appendChild(window.renderPicture(window.data[j]));
  }

  pictures.appendChild(fragment);

  pictures.addEventListener('click', window.preview.onPictureClick, true);
})();
