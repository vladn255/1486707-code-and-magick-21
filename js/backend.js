'use strict';
(function () {
  const URL_POST = `https://21.javascript.pages.academy/code-and-magick`;
  const URL_GET = `https://21.javascript.pages.academy/code-and-magick/data`;
  const TIMEOUT_IN_MS = 10000;
  const StatusCode = {
    OK: 200
  };

  const save = function (data, onLoad) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      onLoad(xhr.response);
    });

    xhr.open(`POST`, URL_POST);
    xhr.send(data);
  };

  const load = function (onLoad, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, URL_GET);
    xhr.send();
  };

  window.backend = {
    load,
    save
  };
})();
