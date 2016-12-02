"use strict"

let canvas, ctx;

const setupCanvas = () => {
  canvas = document.querySelector("#visualizerCanvas");
  ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#FF0000";
};

const renderRocket = (rocket) => {
  renderCapsule(rocket.components[0].capsule, canvas.width / 2, 100);
  renderTank(rocket.components[1].fuelTank, canvas.width / 2, 250);
  renderEngine(rocket.components[2].engines, canvas.width / 2, 330);
};

const renderCapsule = (capsule, xPos, yPos) => {
  let capsuleWidth = 2.925 * capsule.crew;
  let width = capsuleWidth;
  let height = capsuleWidth * 3;
  ctx.beginPath();
  ctx.arc(xPos,yPos,capsuleWidth,0,2*Math.PI);
  ctx.moveTo(xPos, yPos);
  ctx.lineTo(xPos - width, yPos + height);
  ctx.lineTo(xPos + width, yPos + height);
  ctx.closePath();
  ctx.stroke();
};

const renderTank = (tank, xPos, yPos) => {
  let width = tank.diameter * 3;
  let length = tank.length * 3;
  ctx.rect(xPos - width/2, yPos - length / 2, width, length);
  ctx.stroke();
};

const renderEngine = (engine, xPos, yPos) => {
  if(engine.engineType == "merlin") {
    let width = 6;
    let height = 18;
    let totalWidth = width * engine.number;
    for(let i = 0; i < engine.number; i++) {
      let offset = (width * i) - totalWidth / 2 ;
      ctx.beginPath();
      ctx.moveTo(xPos + offset, yPos);
      ctx.lineTo(xPos - width + offset, yPos + height);
      ctx.lineTo(xPos + width + offset, yPos + height);
      ctx.closePath();
      ctx.stroke();
    }
  }
};
