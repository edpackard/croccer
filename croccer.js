"use strict";

let canvas;
let context;

window.onload = init;

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  background();
}

function background() {
  let backgroundColor = "#0099d0";
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, 750, 400);
}
