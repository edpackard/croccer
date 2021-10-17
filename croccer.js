"use strict";

let canvas;
let context;

window.onload = init;

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  draw();
}

function draw() {
  let randomColor = Math.random() > 0.5 ? "#ff8080" : "#0099b0";
  context.fillStyle = randomColor;
  context.fillRect(100, 50, 200, 175);
}
