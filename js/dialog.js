'use strict';
(function () {
  const MIN_NAME_LENGTH = 2;
  const MAX_NAME_LENGTH = 25;
  const setupOpen = document.querySelector(`.setup-open`);
  const setup = document.querySelector(`.setup`);
  const setupClose = setup.querySelector(`.setup-close`);
  const userNameInput = document.querySelector(`.setup-user-name`);
  const setupPlayer = document.querySelector(`.setup-player`);
  const setupWizard = document.querySelector(`.setup-wizard`);
  const wizardCoat = setupWizard.querySelector(`.wizard-coat`);
  const wizardEyes = setupWizard.querySelector(`.wizard-eyes`);
  const wizardFireball = document.querySelector(`.setup-fireball-wrap`);
  const setupBlock = document.querySelector(`.setup`);
  const setupBlockPositionTop = setupBlock.style.top;
  const setupBlockPositionLeft = setupBlock.style.left;

  const COAT_COLORS_LIST = window.setup.COAT_COLORS_LIST;
  const EYES_COLORS_LIST = window.setup.EYES_COLORS_LIST;
  const FIREBALL_COLORS_LIST = window.setup.FIREBALL_COLORS_LIST;

  const onPopupEscPress = function (evt) {
    if (!evt.target.classList.contains(`setup-user-name`)) {
      window.util.isEscapeEvent(evt, closePopup);
    }
  };

  const openPopup = function () {
    setup.classList.remove(`hidden`);
    document.addEventListener(`keydown`, onPopupEscPress);
  };

  const onOpenPopup = function () {
    openPopup();
  };

  const closePopup = function () {
    setup.classList.add(`hidden`);
    document.removeEventListener(`keydown`, onPopupEscPress);
    setup.removeEventListener(`keydown`, onEnterEvent);

    setupBlock.style.top = setupBlockPositionTop;
    setupBlock.style.left = setupBlockPositionLeft;
  };

  const onClosePopup = function () {
    closePopup();
  };

  const onChangeCoatColor = window.debounce.debounce(function () {
    wizardCoat.style.fill = window.util.getRandomItemArray(COAT_COLORS_LIST);
    setupPlayer.querySelector(`input[name="coat-color"]`).value = wizardCoat.style.fill;
    window.setup.coatColor = wizardCoat.style.fill;
    window.setup.updateWizards();
  });

  const onChangeEyesColor = window.debounce.debounce(function () {
    wizardEyes.style.fill = window.util.getRandomItemArray(EYES_COLORS_LIST);
    setupPlayer.querySelector(`input[name="eyes-color"]`).value = wizardEyes.style.fill;
    window.setup.eyesColor = wizardEyes.style.fill;
    window.setup.updateWizards();
  });

  const onChangeFireballColor = function () {
    wizardFireball.querySelector(`input`).value = window.util.getRandomItemArray(FIREBALL_COLORS_LIST);
    wizardFireball.querySelector(`.setup-fireball`).style.backgroundColor = wizardFireball.querySelector(`input`).value;
  };

  const onEnterEvent = function (evt) {
    if (!evt.target.classList.contains(`setup-submit`)) {
      window.util.isEnterEvent(evt, function () {
        evt.preventDefault();
      });
    }
  };

  setupOpen.addEventListener(`click`, onOpenPopup);

  setupOpen.addEventListener(`keydown`, onOpenPopup);

  setupClose.addEventListener(`click`, onClosePopup);

  setupClose.addEventListener(`keydown`, onClosePopup);

  setup.addEventListener(`keydown`, onEnterEvent);

  userNameInput.addEventListener(`input`, function () {
    const valueLength = userNameInput.value.length;

    if (valueLength < MIN_NAME_LENGTH) {
      userNameInput.setCustomValidity(`Ещё ` + (MIN_NAME_LENGTH - valueLength) + ` симв.`);
    } else if (valueLength > MAX_NAME_LENGTH) {
      userNameInput.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_NAME_LENGTH) + ` симв.`);
    } else {
      userNameInput.setCustomValidity(``);
    }
    userNameInput.reportValidity();
  });

  wizardCoat.addEventListener(`click`, onChangeCoatColor);

  wizardEyes.addEventListener(`click`, onChangeEyesColor);

  wizardFireball.addEventListener(`click`, onChangeFireballColor);

})();
