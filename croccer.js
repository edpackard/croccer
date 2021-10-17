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

function gameLoop(timeStamp) {
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
