"use strict";

let canvas;
let context;
let enemyObjects;
let secondsPassed = 0;
let oldTimeStamp = 0;

window.onload = init;

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  createWorld();
  window.requestAnimationFrame(gameLoop);
}

function createWorld() {
  enemyObjects = [
    new Croc(context, 0, 0, 75, 0),
    new Croc(context, 0, 50, 50, 0),
    // new Croc(context, 150, 0, 50, 50),
    // new Croc(context, 250, 150, 50, 50),
    // new Croc(context, 350, 75, -50, 50),
    // new Croc(context, 300, 300, 50, -50),
  ];
}

function gameLoop(timeStamp) {
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;
  secondsPassed = Math.min(secondsPassed, 0.1);

  for (let i = 0; i < enemyObjects.length; i++) {
    enemyObjects[i].update(secondsPassed);
  }

  clearCanvas();
  background();
  for (let i = 0; i < enemyObjects.length; i++) {
    enemyObjects[i].draw();
  }

  window.requestAnimationFrame(gameLoop);
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function background() {
  let backgroundColor = "#0099d0";
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, 750, 400);
}
