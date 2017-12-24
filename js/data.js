'use strict';

(function () {
  window.data = function () {
    var MAX_LIKES = 200;
    var MIN_LIKES = 15;
    var NUMBER_OF_PHOTOS = 25;
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

    for (var i = 1; i <= NUMBER_OF_PHOTOS; i++) {
      var likesNumber = Math.floor(Math.random() * (MAX_LIKES - MIN_LIKES) + MIN_LIKES);

      var photo = {
        url: 'photos/' + i + '.jpg',
        likes: likesNumber,
        comments: generateComments()
      };

      photos.push(photo);
    }

    return photos;
  };
})();
