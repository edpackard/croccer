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
    new Croc(context, 200, 0, 75),
    new Croc(context, 450, 0, 75),
    new Croc(context, 700, 0, 75),
    new Croc(context, 0, 50, 50),
    new Croc(context, 250, 50, 50),
    new Croc(context, 500, 50, 50),
    new Croc(context, 0, 100, 100),
    new Croc(context, 375, 100, 100),
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
  collisionDetection();
  clearCanvas();
  background();
  for (let i = 0; i < enemyObjects.length; i++) {
    enemyObjects[i].draw();
  }
  player.draw();
  window.requestAnimationFrame(gameLoop);
}

function collisionDetection() {
  let enemyObj;

  for (let index = 0; index < enemyObjects.length; index++) {
    enemyObj = enemyObjects[index];

    if (rectIntersect(enemyObj, player)) {
      console.log("boom");
      player.isColliding = true;
    }
  }
}

function rectIntersect(rect1, rect2) {
  let coll1 = rect2.x > rect1.width + rect1.x;
  let coll2 = rect1.x > rect2.width + rect2.x;
  let coll3 = rect2.y > rect1.height - 1 + rect1.y;
  let coll4 = rect1.y > rect2.height - 1 + rect2.y;
  if (coll1 || coll2 || coll3 || coll4) {
    return false;
  }
  return true;
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function background() {
  let backgroundColor = "#0065ff";
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, 750, 400);
}
