"use strict";

let canvas;
let context;
let enemyObjects;
let player;
let secondsPassed = 0;
let oldTimeStamp = 0;
let KeyPresses = { right: false, left: false, up: false, down: false };
let KeyHelper = { right: 39, left: 37, up: 38, down: 40 };

window.onload = init;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  createWorld();
  window.requestAnimationFrame(gameLoop);
}

function createWorld() {
  player = new Player(context, 350, 350, 50, 50);
  enemyObjects = [
    new Croc(context, 0, 0, 75, 0),
    new Croc(context, 0, 50, 50, 0),
    new Croc(context, 300, 0, 75, 0),
    new Croc(context, 300, 50, 50, 0),
  ];
}

function keyDownHandler(event) {
  if (event.keyCode == KeyHelper.right) {
    KeyPresses.right = true;
  }
  if (event.keyCode == KeyHelper.left) {
    KeyPresses.left = true;
  }
  if (event.keyCode == KeyHelper.up) {
    KeyPresses.up = true;
  }
  if (event.keyCode == KeyHelper.down) {
    KeyPresses.down = true;
  }
}

function keyUpHandler(event) {
  if (event.keyCode == KeyHelper.right) {
    KeyPresses.right = false;
    player.right = true;
  }
  if (event.keyCode == KeyHelper.left) {
    KeyPresses.left = false;
    player.left = true;
  }
  if (event.keyCode == KeyHelper.up) {
    KeyPresses.up = false;
    player.up = true;
  }
  if (event.keyCode == KeyHelper.down) {
    KeyPresses.down = false;
    player.down = true;
  }
}

function gameLoop(timeStamp) {
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;
  secondsPassed = Math.min(secondsPassed, 0.1);

  for (let i = 0; i < enemyObjects.length; i++) {
    enemyObjects[i].update(secondsPassed);
  }
  player.update(KeyPresses);

  clearCanvas();
  background();
  for (let i = 0; i < enemyObjects.length; i++) {
    enemyObjects[i].draw();
  }
  player.draw();

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
