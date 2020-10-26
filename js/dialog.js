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
  const setupBlockPositionTop = window.setup.setupBlock.style.top;
  const setupBlockPositionLeft = window.setup.setupBlock.style.left;

  const onPopupEscPress = function (evt) {
    if (!evt.target.matches(`.setup-user-name`)) {
      window.util.isEscEvent(evt, closePopup);
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

    window.setup.setupBlock.style.top = setupBlockPositionTop;
    window.setup.setupBlock.style.left = setupBlockPositionLeft;
  };

  const onClosePopup = function () {
    closePopup();
  };

  const onChangeCoatColor = function () {
    wizardCoat.style.fill = window.util.getRandomItemArray(window.setup.COAT_COLORS_LIST);
    setupPlayer.querySelector(`input[name="coat-color"]`).value = wizardCoat.style.fill;
  };

  const onChangeEyesColor = function () {
    wizardEyes.style.fill = window.util.getRandomItemArray(window.setup.EYES_COLORS_LIST);
    setupPlayer.querySelector(`input[name="eyes-color"]`).value = wizardEyes.style.fill;
  };

  const onChangeFireballColor = function () {
    wizardFireball.querySelector(`input`).value = window.util.getRandomItemArray(window.setup.FIREBALL_COLORS_LIST);
    wizardFireball.querySelector(`.setup-fireball`).style.backgroundColor = wizardFireball.querySelector(`input`).value;
  };

  setupOpen.addEventListener(`click`, onOpenPopup);

  setupOpen.addEventListener(`keydown`, onOpenPopup);

  setupClose.addEventListener(`click`, onClosePopup);

  setupClose.addEventListener(`keydown`, onClosePopup);

  setup.addEventListener(`keydown`, function (evt) {
    if (!evt.target.matches(`.setup-submit`)) {
      window.util.isEnterEvent(evt, evt.preventDefault);
    }
  });

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
