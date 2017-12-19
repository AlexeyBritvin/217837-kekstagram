'use strict';

(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = 5000;
      xhr.open('GET', 'https://1510.dump.academy/kekstagram/data');
      xhr.send();

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
    },

    save: function (data, onLoad, onError) {
      onLoad();
      onError(error);
    }
  };
})();
