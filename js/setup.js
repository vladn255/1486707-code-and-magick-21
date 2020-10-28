'use strict';

(function () {
  const NAMES_LIST = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
  const SURNAMES_LIST = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
  const COAT_COLORS_LIST = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
  const EYES_COLORS_LIST = [`black`, `red`, `blue`, `yellow`, `green`];
  const FIREBALL_COLORS_LIST = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
  const CHARACTERS_NUMBER = 4;
  const setupBlock = document.querySelector(`.setup`);
  const similarListElement = setupBlock.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

  const charactersList = [];

  const createName = function () {
    const name = NAMES_LIST[window.util.randomInteger(0, NAMES_LIST.length - 1)] + ` ` + SURNAMES_LIST[window.util.randomInteger(0, SURNAMES_LIST.length - 1)];
    return name;
  };

  const createCharactersList = function () {
    for (let i = 0; i < CHARACTERS_NUMBER; i++) {
      const wizard = {
        name: createName(),
        coatColor: window.util.getRandomItemArray(COAT_COLORS_LIST),
        eyesColor: window.util.getRandomItemArray(EYES_COLORS_LIST)
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

  similarListElement.appendChild(fragment);

  setupBlock.querySelector(`.setup-similar`).classList.remove(`hidden`);

  window.setup = {
    COAT_COLORS_LIST,
    EYES_COLORS_LIST,
    FIREBALL_COLORS_LIST
  };
})();
