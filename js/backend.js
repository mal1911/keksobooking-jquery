'use strict';
(function () {
  var TIMEOUT = 10000;

  var load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    addResponseHandler(xhr, onSuccess, onError, TIMEOUT);
    xhr.open('GET', url);
    xhr.send();
  };

  var save = function (data, url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    addResponseHandler(xhr, onSuccess, onError, TIMEOUT);
    xhr.open('POST', url);
    xhr.send(data);
  };

  var addResponseHandler = function (xhr, onSuccess, onError, timeout) {
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = timeout;
  };

  window.backend = {
    load: load,
    save: save
  };
})();
