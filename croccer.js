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

let secondsPassed;
let oldTimeStamp;
let fps;

function gameLoop(timeStamp) {
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;
  fps = Math.round(1 / secondsPassed);
  context.fillStyle = "white";
  context.fillRect(0, 0, 200, 100);
  context.font = "25px Arial";
  context.fillStyle = "black";
  context.fillText("FPS: " + fps, 10, 30);
  draw();
  window.requestAnimationFrame(gameLoop);
}

function draw() {
  let randomColor = Math.random() > 0.5 ? "#ff8080" : "#0099b0";
  context.fillStyle = randomColor;
  context.fillRect(100, 50, 200, 175);
}

function background() {
  let backgroundColor = "#0099d0";
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, 750, 400);
}
