'use strict';

const setupBlock = document.querySelector(`.setup`);
const NAMES_LIST = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const SURNAMES_LIST = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS_LIST = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS_LIST = [`black`, `red`, `blue`, `yellow`, `green`];
const FIREBALL_COLORS_LIST = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
const KEY_ENTER = `Enter`;
const KEY_ESCAPE = `Escape`;

const similarListElement = setupBlock.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);
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

const charactersList = [];

const randomInteger = function (min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const createName = function () {
  const name = NAMES_LIST[randomInteger(0, NAMES_LIST.length - 1)] + ` ` + SURNAMES_LIST[randomInteger(0, SURNAMES_LIST.length - 1)];
  return name;
};

const getRandomItemArray = function (array) {
  const itemArray = array[randomInteger(0, array.length - 1)];
  return itemArray;
};

const createCharactersList = function () {
  for (let i = 0; i < 4; i++) {
    const wizard = {
      name: createName(),
      coatColor: getRandomItemArray(COAT_COLORS_LIST),
      eyesColor: getRandomItemArray(EYES_COLORS_LIST)
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

const onPopupEscPress = function (evt) {
  if (evt.key === KEY_ESCAPE && !evt.target.matches(`.setup-user-name`)) {
    closePopup();
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
};

const onClosePopup = function () {
  closePopup();
};

const onChangeCoatColor = function () {
  wizardCoat.style.fill = getRandomItemArray(COAT_COLORS_LIST);
  setupPlayer.querySelector(`input[name="coat-color"]`).value = wizardCoat.style.fill;
};

const onChangeEyesColor = function () {
  wizardEyes.style.fill = getRandomItemArray(EYES_COLORS_LIST);
  setupPlayer.querySelector(`input[name="eyes-color"]`).value = wizardEyes.style.fill;
};

const onChangeFireballColor = function () {
  wizardFireball.querySelector(`input`).value = getRandomItemArray(FIREBALL_COLORS_LIST);
  wizardFireball.querySelector(`.setup-fireball`).style.backgroundColor = wizardFireball.querySelector(`input`).value;
};

setupOpen.addEventListener(`click`, onOpenPopup);

setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === KEY_ENTER) {
    openPopup();
  }
});

setupClose.addEventListener(`click`, onClosePopup);

setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === KEY_ENTER) {
    closePopup();
  }
});

setup.addEventListener(`keydown`, function (evt) {
  if (evt.key === KEY_ENTER && !evt.target.matches(`.setup-submit`)) {
    evt.preventDefault();
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

similarListElement.appendChild(fragment);

setupBlock.querySelector(`.setup-similar`).classList.remove(`hidden`);

