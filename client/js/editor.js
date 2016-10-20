"use strict";

//var app = app || {};

//app.editor = {
let newRocketButton, saveRocketButton, addControlModuleButton,
addFuelTankButton, addEnginesButton, addStackSeparatorButton;

let typeOfControllerInput, numOfPeopleInput, controlUnitWidthInput,
fairingLengthInput, tankLengthInput, tankDiameterInput,
tankTypeInput, fuelTypeInput, engineNumberInput,
engineTypeInput;



const init = () => {
  setupButtons();
  setupInputs();
};

const setupButtons = () => {
  newRocketButton         = document.querySelector("#newRocketButton");
  saveRocketButton        = document.querySelector("#saveButton");
  addControlModuleButton  = document.querySelector("#addControlModuleButton");
  addFuelTankButton       = document.querySelector("#addFuelTankButton");
  addEnginesButton        = document.querySelector("#addEnginesButton");
  addStackSeparatorButton = document.querySelector("#stageSeparatorButton");

  
};

const setupInputs = () => {
  typeOfControllerInput = document.querySelector("#typeOfControllerInput");
  numOfPeopleInput      = document.querySelector("#numOfPeopleInput");
  controlUnitWidthInput = document.querySelector("#controlUnitWidthInput");
  fairingLengthInput    = document.querySelector("#fairingLengthInput");
  tankLengthInput       = document.querySelector("#tankLengthInput");
  tankDiameterInput     = document.querySelector("#tankDiameterInput");
  tankTypeInput         = document.querySelector("#tankTypeInput");
  fuelTypeInput         = document.querySelector("#fuelTypeInput");
  engineNumberInput     = document.querySelector("#engineNumberInput");
  engineTypeInput       = document.querySelector("#engineTypeInput");
};

const addControlModule = () => {

};

const addFuelTank = () => {

};

const addEngines = () => {

};

const addStackSeparator = () => {

};





window.onload = init;
