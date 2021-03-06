'use strict';

(function () {
  const COAT_COLORS_LIST = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
  const EYES_COLORS_LIST = [`black`, `red`, `blue`, `yellow`, `green`];
  const FIREBALL_COLORS_LIST = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
  const CHARACTERS_NUMBER = 4;
  const setupBlock = document.querySelector(`.setup`);
  const similarListElement = setupBlock.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);
  const form = setupBlock.querySelector(`.setup-wizard-form`);


  const renderWizard = function (wizard) {
    const wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardElement;
  };

  const successHandler = function (wizards) {
    const fragment = document.createDocumentFragment();

    let maxWizardsCount = wizards.length < CHARACTERS_NUMBER ? wizards.length : CHARACTERS_NUMBER;

    for (let i = 0; i < maxWizardsCount; i++) {
      let randomWizardNumber = window.util.randomInteger(0, wizards.length - 1);
      fragment.appendChild(renderWizard(wizards[randomWizardNumber]));
      wizards.splice(randomWizardNumber, 1);
    }

    similarListElement.appendChild(fragment);

    setupBlock.querySelector(`.setup-similar`).classList.remove(`hidden`);
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
    FIREBALL_COLORS_LIST
  };
})();
