'use strict';
(function () {
  const URL_POST = `https://21.javascript.pages.academy/code-and-magick`;
  const URL_GET = `https://21.javascript.pages.academy/code-and-magick/data`;
  const TIMEOUT_IN_MS = 10000;
  const StatusCode = {
    OK: 200
  };

  const checkIfErrors = function (request, load, error) {
    request.addEventListener(`load`, function () {
      if (request.status === StatusCode.OK) {
        load(request.response);
      } else {
        error(`Статус ответа: ` + request.status + ` ` + request.statusText);
      }
    });

    request.addEventListener(`error`, function () {
      error(`Произошла ошибка соединения`);
    });
    request.addEventListener(`timeout`, function () {
      error(`Запрос не успел выполниться за ` + request.timeout + `мс`);
    });
  };

  const save = function (data, onLoad, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    checkIfErrors(xhr, onLoad, onError);

    xhr.open(`POST`, URL_POST);
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.send(data);
  };

  const load = function (onLoad, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    checkIfErrors(xhr, onLoad, onError);

    xhr.open(`GET`, URL_GET);
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.send();
  };

  window.backend = {
    load,
    save
  };
})();
