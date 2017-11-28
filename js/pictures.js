'use strict';

var photos = [];

var generatePhotosArray = function () {
  var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var generateComment = function () {
    var number = Math.floor(Math.random());
    var comment;

    if (number === 0) {
      comment = comments[Math.floor(Math.random() * comments.length)];
    } else {
      var firstCommentPart = comments[Math.floor(Math.random() * comments.length)];
      var secondCommentPart = comments[Math.floor(Math.random() * comments.length)];

      comment = firstCommentPart + ' ' + secondCommentPart;
    }

    return comment;
  };

  for (var i = 1; i <= 25; i++) {
    var likesNumber = Math.floor(Math.random() * (200 - 15) + 15);

    var photo = {
      url: 'photos/' + i + '.jpg',
      likes: likesNumber,
      comments: generateComment()
    };

    photos.push(photo);
  }
}();

function renderPicture (photo) {
  var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
  var pictureElement = pictureTemplate.cloneNode(true);

  var img = pictureElement.querySelector('img').setAttribute('src', photo.url);
  var pictureLikes = pictureElement.querySelector('.picture-likes').textContent = photo.likes;
  var pictureComment = pictureElement.querySelector('.picture-comments').textContent = photo.comment;

  return pictureElement;
};

var insertPictures = function () {
  var fragment = document.createDocumentFragment();
  var pictures = document.querySelector('.pictures');

  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPicture(photos[i]));
  }

  pictures.appendChild(fragment);
}();

var showGallery = function () {
  var gallery = document.querySelector('.gallery-overlay');
  var galleryImage = gallery.querySelector('.gallery-overlay-image');
  var galleryLikes = gallery.querySelector('.likes-count');
  var galleryComments = gallery.querySelector('.comments-count');

  gallery.classList.remove('hidden');
  galleryImage.setAttribute('src', photos[0].url);
  galleryLikes.textContent = photos[0].likes;
  galleryComments.textContent = photos[0].comment;
}();
