"use strict";

//var app = app || {};

//app.editor = {
let newRocketButton, saveRocketButton, addControlModuleButton,
addFuelTankButton, addEnginesButton, addStackSeparatorButton;

let typeOfControllerInput, numOfPeopleInput, controlUnitWidthInput,
fairingLengthInput, tankLengthInput, tankDiameterInput,
tankTypeInput, fuelTypeInput, engineNumberInput,
engineTypeInput;

let controls, controlModule, capsuleDetails,
fairingDetails, fuelModule, engineModule;

let rocket = {};



const init = () => {
  setupButtons();
  setupInputs();
  setupDivs();
  setupCanvas();
};

const setupButtons = () => {
  newRocketButton         = document.querySelector("#newRocketButton");
  saveRocketButton        = document.querySelector("#saveButton");
  addControlModuleButton  = document.querySelector("#addControlModuleButton");
  addFuelTankButton       = document.querySelector("#addFuelTankButton");
  addEnginesButton        = document.querySelector("#addEnginesButton");
  addStackSeparatorButton = document.querySelector("#stageSeparatorButton");

  newRocketButton.addEventListener("click", initializeRocketBuilder);
  addControlModuleButton.addEventListener("click", addControlModule);
  addFuelTankButton.addEventListener("click", addFuelTank);
  addEnginesButton.addEventListener("click", addEngines);
  saveRocketButton.addEventListener("click", saveRocket);
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

const setupDivs = () => {
  controls       = document.querySelector("#controls");
  controlModule  = document.querySelector("#controlModule");
  capsuleDetails = document.querySelector("#capsuleDetails");
  fairingDetails = document.querySelector("#fairingDetails");
  fuelModule     = document.querySelector("#fuelModule");
  engineModule   = document.querySelector("#engineModule");
};

const initializeRocketBuilder = () => {
  controlModule.style.display = "block";
  if(typeOfControllerInput.value == "capsule") {
    capsuleDetails.style.display = "block";
  }

  rocket = {
    description: {},
    components: [],
    statistics: {}
  };
};

const addControlModule = () => {
  if(validateInputInt(numOfPeopleInput.value, 1, 100)) {
    let capsule = {
      capsule: {
        crew: Number.parseInt(numOfPeopleInput.value),
        mass: 1600 * Number.parseInt(numOfPeopleInput.value)
      }
    };
    fuelModule.style.display = "block";
    controlModule.style.display = "none";
    rocket.components.push(capsule);
  } else Window.alert("There was an error");

};

const addFuelTank = () => {
  if( validateInputFloat(tankLengthInput.value, 1, 300) &&
   validateInputFloat(tankDiameterInput.value, 0.1, 30)) {
     let fuelTank = {
       fuelTank: {
         length: Number.parseInt(tankLengthInput.value),
         diameter: Number.parseInt(tankDiameterInput.value),
         volume: Number.parseInt(tankLengthInput.value) * (Number.parseInt(tankDiameterInput.value) / 2) * (Number.parseInt(tankDiameterInput.value) / 2) * Math.PI,
         fuelType: fuelTypeInput.value,
         tankType: tankTypeInput.value
       }
     };
     fuelModule.style.display = "none";
     engineModule.style.display = "block";
     rocket.components.push(fuelTank);
   } else Window.alert("There was an error");
};

const addEngines = () => {
  if(validateInputInt(engineNumberInput.value, 1, 50)) {
    let engines = {
      engines: {
        number: engineNumberInput.value,
        engineType: engineTypeInput.value
      }
    };
     rocket.components.push(engines);
  }else Window.alert("There was an error");
};

const validateInputInt = (input, min, max) => {
  if(input) {
    let intInput = Number.parseInt(input);
    if(intInput < min || intInput > max) return false
    return true;
  }
};

const validateInputFloat = (input, min, max) => {
  if(input) {
    let intInput = Number.parseFloat(input);
    if(intInput < min || intInput > max) return false
    return true;
  }
};

const addStackSeparator = () => {

};

const saveRocket = () => {
  renderRocket(rocket);
};





window.onload = init;
