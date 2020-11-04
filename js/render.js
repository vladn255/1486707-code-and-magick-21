'use strict';
(function () {
  const CHARACTERS_NUMBER = 4;
  const setupBlock = document.querySelector(`.setup`);
  const similarListElement = setupBlock.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);


  const renderWizard = function (wizard) {
    const wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardElement;
  };

  const render = function (wizards) {
    const fragment = document.createDocumentFragment();

    let maxWizardsCount = wizards.length < CHARACTERS_NUMBER
      ? wizards.length
      : CHARACTERS_NUMBER;

    similarListElement.innerHTML = ``;

    for (let i = 0; i < maxWizardsCount; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);

    setupBlock.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  window.render = {
    render
  };
})();
