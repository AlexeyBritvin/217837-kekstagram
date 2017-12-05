'use strict';

var photos = [];

var commentParts = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var generateComments = function () {
  var number = Math.floor(Math.random());
  var comments = [];

  function getRandomComment() {
    var commentPart = commentParts[Math.floor(Math.random() * commentParts.length)];
    return commentPart;
  }

  if (number === 0) {
    comments.push(getRandomComment());
  } else {
    var firstCommentPart = getRandomComment();
    var secondCommentPart = getRandomComment();

    comments.push(firstCommentPart + ' ' + secondCommentPart);
  }

  return comments;
};

for (var i = 1; i <= 25; i++) {
  var likesNumber = Math.floor(Math.random() * (200 - 15) + 15);

  var photo = {
    url: 'photos/' + i + '.jpg',
    likes: likesNumber,
    comments: generateComments()
  };

  photos.push(photo);
}

function renderPicture(picture) {
  var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('img').setAttribute('src', picture.url);
  pictureElement.querySelector('.picture-likes').textContent = picture.likes;
  pictureElement.querySelector('.picture-comments').textContent = picture.comments.length;

  return pictureElement;
}

var fragment = document.createDocumentFragment();
var pictures = document.querySelector('.pictures');

for (var j = 0; j < photos.length; j++) {
  fragment.appendChild(renderPicture(photos[j]));
}

pictures.appendChild(fragment);

var gallery = document.querySelector('.gallery-overlay');
var galleryImage = gallery.querySelector('.gallery-overlay-image');
var galleryLikes = gallery.querySelector('.likes-count');
var galleryComments = gallery.querySelector('.comments-count');

gallery.classList.remove('hidden');
galleryImage.setAttribute('src', photos[0].url);
galleryLikes.textContent = photos[0].likes;
galleryComments.textContent = photos[0].comments.length;