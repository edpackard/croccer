"use strict";

let canvas;
let context;

window.onload = init;

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  background();
  window.requestAnimationFrame(gameLoop);
}

let rectX = 0;
let rectY = 0;

let secondsPassed = 0;
let oldTimeStamp = 0;
let movingSpeed = 100;

function gameLoop(timeStamp) {
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  update(secondsPassed);
  draw();
  window.requestAnimationFrame(gameLoop);
}

function update(secondsPassed) {
  console.log(rectX, rectY);
  rectX += movingSpeed * secondsPassed;
  if (rectX > canvas.width) {
    rectX = 0;
  }
  // rectY += movingSpeed * secondsPassed;
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = "#ff8080";
  context.strokeRect(rectX, rectY, 50, 50);
}

function background() {
  let backgroundColor = "#0099d0";
  context.fillStyle = backgroundColor;
  context.strokeRect(0, 0, 750, 400);
}
