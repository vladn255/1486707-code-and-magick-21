'use strict';

const setupBlock = document.querySelector(`.setup`);
const NAMES_LIST = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const SURNAMES_LIST = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS_LIST = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS_LIST = [`black`, `red`, `blue`, `yellow`, `green`];
const FIREBALL_COLORS_LIST = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
const similarListElement = setupBlock.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 25;
const userNameInput = document.querySelector(`.setup-user-name`);
const setupPlayer = document.querySelector(`.setup-player`);
const setupWizard = document.querySelector(`.setup-wizard`);
const wizardCoat = setupWizard.querySelector(`.wizard-coat`);
const wizardEyes = setupWizard.querySelector(`.wizard-eyes`);
const wizardFireball = document.querySelector(`.setup-fireball-wrap`);

const charactersList = [];

const randomInteger = function (min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const createName = function () {
  const name = NAMES_LIST[randomInteger(0, NAMES_LIST.length - 1)] + ` ` + SURNAMES_LIST[randomInteger(0, SURNAMES_LIST.length - 1)];
  return name;
};

const createCoatColor = function () {
  const coatColor = COAT_COLORS_LIST[randomInteger(0, COAT_COLORS_LIST.length - 1)];
  return coatColor;
};

const createEyesColor = function () {
  const eyesColor = EYES_COLORS_LIST[randomInteger(0, EYES_COLORS_LIST.length - 1)];
  return eyesColor;
};

const createFireballColor = function () {
  const fireballColor = FIREBALL_COLORS_LIST[randomInteger(0, FIREBALL_COLORS_LIST.length - 1)];
  return fireballColor;
};

const createCharactersList = function () {
  for (let i = 0; i < 4; i++) {
    const wizard = {
      name: createName(),
      coatColor: createCoatColor(),
      eyesColor: createEyesColor()
    };
    charactersList.push(wizard);
  }
  return charactersList;
};

const renderWizard = function (wizard) {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

createCharactersList();

const fragment = document.createDocumentFragment();
for (let i = 0; i < charactersList.length; i++) {
  fragment.appendChild(renderWizard(charactersList[i]));
}

const setupOpen = document.querySelector(`.setup-open`);
const setup = document.querySelector(`.setup`);
const setupClose = setup.querySelector(`.setup-close`);

const onPopupEscPress = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    if (!evt.target.matches(`.setup-user-name`)) {
      closePopup();
    }
  }
};

const openPopup = function () {
  setup.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onPopupEscPress);
};

const closePopup = function () {
  setup.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onPopupEscPress);
};

const coatChanger = function () {
  wizardCoat.style.fill = createCoatColor();
  setupPlayer.querySelector(`input[name="coat-color"]`).value = wizardCoat.style.fill;
};

const eyesChanger = function () {
  wizardEyes.style.fill = createEyesColor();
  setupPlayer.querySelector(`input[name="eyes-color"]`).value = wizardEyes.style.fill;
};

const fireballChanger = function () {
  wizardFireball.querySelector(`input`).value = createFireballColor();
  wizardFireball.querySelector(`.setup-fireball`).style.backgroundColor = wizardFireball.querySelector(`input`).value;
};

setupOpen.addEventListener(`click`, function () {
  openPopup();
});

setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

setupClose.addEventListener(`click`, function () {
  closePopup();
});

setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    closePopup();
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

wizardCoat.addEventListener(`click`, function () {
  coatChanger();
});

wizardEyes.addEventListener(`click`, function () {
  eyesChanger();
});

wizardFireball.addEventListener(`click`, function () {
  fireballChanger();
});

similarListElement.appendChild(fragment);

setupBlock.classList.remove(`hidden`);
setupBlock.querySelector(`.setup-similar`).classList.remove(`hidden`);

