"use strict";

//var app = app || {};

//app.editor = {
let newRocketButton, saveRocketButton, addControlModuleButton,
addFuelTankButton, addEnginesButton, addStackSeparatorButton;

let typeOfControllerInput, numOfPeopleInput, controlUnitWidthInput,
fairingLengthInput, tankLengthInput, tankDiameterInput,
tankTypeInput, fuelTypeInput, engineNumberInput,
engineTypeInput, rocketNameInput, rocketDescriptionInput;

let controls, controlModule, capsuleDetails,
fairingDetails, fuelModule, engineModule;

let massRatio, massFinal, massInitial, exhaustVelocity, tankRatio, totalCost, fueltypeDensity;

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
  saveRocketButton.style.display = "none";
};

const setupInputs = () => {
  typeOfControllerInput        = document.querySelector("#typeOfControllerInput");
  numOfPeopleInput             = document.querySelector("#numOfPeopleInput");
  controlUnitWidthInput        = document.querySelector("#controlUnitWidthInput");
  fairingLengthInput           = document.querySelector("#fairingLengthInput");
  tankLengthInput              = document.querySelector("#tankLengthInput");
  tankDiameterInput            = document.querySelector("#tankDiameterInput");
  tankTypeInput                = document.querySelector("#tankTypeInput");
  fuelTypeInput                = document.querySelector("#fuelTypeInput");
  engineNumberInput            = document.querySelector("#engineNumberInput");
  engineTypeInput              = document.querySelector("#engineTypeInput");
  rocketNameInput              = document.querySelector("#rocketNameInput");
  rocketDescriptionInput       = document.querySelector("#rocketDescriptionInput");
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
  if(typeOfControllerInput.value === "capsule") {
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
     checkTankType(tankTypeInput.value);
     checkFuelType(fuelTypeInput.value);
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
     checkEngineType(engineTypeInput.value);
     saveRocketButton.style.display = "block";
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

const addDescription = () => {
  rocket.description.name = rocketNameInput.value;
  rocket.description.shortDesc = rocketDescriptionInput.value;
};

const addStatistics = () => {
  /*
  deltaV: {
    type: Number,
    min: 0,
  },
  stages: {
    type: Number,
    min: 0,
  },
  cost: {
    type: Number,
    min: 0,
  },
  mass: {
    type: Number,
    min: 0,
  },*/
  rocket.statistics.mass =   calculateMass()
  rocket.statistics.deltaV = calculateDeltaV();
  rocket.statistics.cost =   calculateCost();
  rocket.statistics.stages = 1;
};

const saveRocket = () => {
  renderRocket(rocket);
  addDescription();
  addStatistics();
  // error check

  //send post request
  sendAjax("/addRocket", rocket);
};

const sendAjax = (action, data) => {
    $.ajax({
        cache: false,
        type: "POST",
        url: action,
        data: data,
        dataType: "json",
        success: (result, status, xhr) => {
          //  $("#domoMessage").animate({width:'hide'},350);
            if(result.redirect) window.location = result.redirect;
        },
        error: (xhr, status, error) => {
            const messageObj = JSON.parse(xhr.responseText);

            //handleError(messageObj.error);
        }
    });
};

const calculateDeltaV = () => {
  // deltaV = exhaustVelocity * ln(massInitial/massFinal)
  // deltaV = exhaustVelocity * ln(massRatio)
  let deltaV = exhaustVelocity * Math.log(massRatio);
  return deltaV;
};

const calculateMass = () => {
   // tankMass = volume * fuelTypeDensity
  let tankMass = Number.parseInt(rocket.components[1].fuelTank.volume) * fueltypeDensity;
  let dryMass = tankMass - (tankMass * tankRatio);
  let wetMass = tankMass - dryMass;
  let engineMass = Number.parseInt(rocket.components[2].engines.number) * 1000;
  let payloadMass = 1000 + (Number.parseInt(rocket.components[0].capsule.crew) * 750);
  massInitial = tankMass + engineMass + payloadMass;
  massFinal = massInitial - wetMass;
  massRatio = massInitial / massFinal;
  return massInitial;
};

const calculateCost = () => {

  totalCost = massFinal * 3.759;

  return totalCost;
};

const checkTankType = ( ttype ) => {
  switch(ttype) {
    case 'balloon':
      tankRatio = .9;
      break;
    case 'monocoque':
      tankRatio = .85;
      break;
    case 'traditional':
      tankRatio = .8;
      break;
    default:
      tankRatio = .75;
      break;
  }
};

const checkEngineType = ( eType ) => {
  const GRAVITY = 9.81;
  switch(eType) {
    case 'merlin':
      let specificImpulse = 282;
      exhaustVelocity = GRAVITY * specificImpulse;
      break;
    default:
      exhaustVelocity = GRAVITY * 100;
      break;
  }
};

const checkFuelType = (fType) => {
  // kg/m^3
  switch(fType) {
    case 'methalox':
      fueltypeDensity = 828;
      break;
    case 'kerolox':
      fueltypeDensity = 1031;
      break;
    case 'hydrolox':
      fueltypeDensity = 358;
      break;
    default:
      fueltypeDensity = 200;
      break;
  }
};

window.onload = init;
