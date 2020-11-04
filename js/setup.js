'use strict';

(function () {
  const COAT_COLORS_LIST = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
  const EYES_COLORS_LIST = [`black`, `red`, `blue`, `yellow`, `green`];
  const FIREBALL_COLORS_LIST = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
  const setupBlock = document.querySelector(`.setup`);
  const form = setupBlock.querySelector(`.setup-wizard-form`);

  let coatColor = `rgb(101, 137, 164)`;
  let eyesColor = `black`;
  let wizards = [];

  const getRank = function (wizard) {

    let rank = 0;

    if (wizard.colorCoat === window.setup.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === window.setup.eyesColor) {
      rank += 1;
    }

    return rank;
  };

  const namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  const updateWizards = function () {
    window.render.render(wizards.sort(function (left, right) {
      let rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  const successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.classList.add(`error`);

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const removeErrorBlock = function () {
    if (document.querySelector(`.error`)) {
      document.querySelector(`.error`).remove();
    }
  };

  const submitHandler = function (evt) {
    removeErrorBlock();
    const onSuccess = function () {
      setupBlock.classList.add(`hidden`);
    };
    window.backend.save(new FormData(form), onSuccess, errorHandler);
    evt.preventDefault();
  };

  window.backend.load(successHandler, errorHandler);

  form.addEventListener(`submit`, submitHandler);

  window.setup = {
    COAT_COLORS_LIST,
    EYES_COLORS_LIST,
    FIREBALL_COLORS_LIST,
    coatColor,
    eyesColor,
    updateWizards
  };
})();
