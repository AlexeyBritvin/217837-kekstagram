'use strict';

(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = 5000;
      xhr.open('GET', 'https://1510.dump.academy/kekstagram/data');

      var onSuccess = function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
        }
      };

      xhr.addEventListener('load', onSuccess);

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.send();
    },

    save: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = 10000;
      xhr.open('POST', 'https://1510.dump.academy/kekstagram');

      var onLoad = function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
        }
      };

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.addEventListener('load', onLoad);

      xhr.send(data);
    }
  };
})();
