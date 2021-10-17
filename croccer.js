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

function gameLoop(timeStamp) {
  update();
  draw();
  window.requestAnimationFrame(gameLoop);
}

function update() {
  rectX += 1;
  rectY += 1;
}

function draw() {
  context.strokeStyle = "#ff8080";
  context.strokeRect(rectX, rectY, 50, 50);
}

function background() {
  let backgroundColor = "#0099d0";
  context.fillStyle = backgroundColor;
  context.strokeRect(0, 0, 750, 400);
}
