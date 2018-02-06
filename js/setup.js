'use strict';

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var WIZARD_SECOND_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var WIZARD_COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var WIZARD_EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var WIZARDS_NUMBER = 4;

var userSetupDomObject = document.querySelector('.setup');
var userSetupSimilarDomObject = userSetupDomObject.querySelector('.setup-similar');
var setupSimilarListDomObject = userSetupSimilarDomObject.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var displayObject = function (hiddenDomObject) {
  hiddenDomObject.classList.remove('hidden');
};

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var pullRandomElement = function (elements) {
  var randomElement;
  var randomIndex;
  var elementsLength = elements.length;

  if (elementsLength !== 0) {
    randomIndex = getRandomInteger(0, elementsLength);
    randomElement = elements.splice(randomIndex, 1)[0];
  }

  return randomElement;
};

var getShuffledArray = function (elements) {
  elements = elements.slice();
  var elementsLength = elements.length;
  var shuffledArray = [];

  for (var i = 0; i < elementsLength; i++) {
    shuffledArray.push(pullRandomElement(elements, true));
  }

  return shuffledArray;
};

var generateWizard = function () {
  var wizard = {};
  var wizardName = pullRandomElement(WIZARD_NAMES);
  var wizardSecondName = pullRandomElement(WIZARD_SECOND_NAMES);
  var wizardFullName = [
    wizardName,
    wizardSecondName
  ];
  var wizardCoatColor = pullRandomElement(WIZARD_COAT_COLORS);
  var wizardEyesColor = pullRandomElement(WIZARD_EYES_COLORS);

  wizard.name = getShuffledArray(wizardFullName).join(' ');
  wizard.coatColor = wizardCoatColor;
  wizard.eyesColor = wizardEyesColor;

  return wizard;
};

var generateWizardsList = function () {
  var wizards = [];

  for (var i = 0; i < WIZARDS_NUMBER; i++) {
    wizards.push(generateWizard());
  }

  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
var wizards = generateWizardsList();

displayObject(userSetupDomObject);

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

setupSimilarListDomObject.appendChild(fragment);
displayObject(userSetupSimilarDomObject);

