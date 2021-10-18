"use strict";

let canvas;
let context;
let enemyObjects;
let player;
let secondsPassed;
let oldTimeStamp;
let KeyPresses;
let KeyHelper = { right: 39, left: 37, up: 38, down: 40 };
let currentLevel = 1;

window.onload = init();

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function init() {
  document.querySelector(`span[class='level']`).innerText = currentLevel;
  KeyPresses = { right: false, left: false, up: false, down: false };
  secondsPassed = 0;
  oldTimeStamp = 0;
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  createWorld();
  window.requestAnimationFrame(gameLoop);
}

function createWorld() {
  player = new Player(context, 350, 350, 50, 50);
  let speedBoost = currentLevel < 10 ? currentLevel * 8 : currentLevel * 12;
  let leftCrocsX = [100, 367, 634];
  let leftCrocsY = currentLevel < 8 ? [50, 150] : [50, 150, 250];
  let rightCrocsX = [0, 200, 400, 600];
  let rightCrocsY = currentLevel < 5 ? [0, 100] : [0, 100, 200];
  let bonusCrocsX = [0, 133, 266, 400, 533, 666];
  enemyObjects = [];
  for (const crocX of leftCrocsX) {
    for (const crocY of leftCrocsY) {
      let newCroc = new Croc(context, crocX, crocY, -60 - speedBoost);
      enemyObjects.push(newCroc);
    }
  }
  for (const crocX of rightCrocsX) {
    for (const crocY of rightCrocsY) {
      let newCroc = new Croc(context, crocX, crocY, 50 + speedBoost);
      enemyObjects.push(newCroc);
    }
  }
  if (currentLevel > 15) {
    for (const crocX of bonusCrocsX) {
      let newCroc = new Croc(context, crocX, 300, -40 + speedBoost);
      enemyObjects.push(newCroc);
    }
  }
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
  if (player.hasWon || player.isColliding) {
    gameOutcome();
  } else {
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    secondsPassed = Math.min(secondsPassed, 0.1);
    for (let i = 0; i < enemyObjects.length; i++) {
      enemyObjects[i].update(secondsPassed);
    }
    player.update(KeyPresses);
    collisionDetection();
    checkWin();
    clearCanvas();
    background();
    for (let i = 0; i < enemyObjects.length; i++) {
      enemyObjects[i].draw();
    }
    player.draw();
    window.requestAnimationFrame(gameLoop);
  }
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
  let coll1 = rect2.x > rect1.width - 10 + rect1.x;
  let coll2 = rect1.x > rect2.width - 10 + rect2.x;
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

function checkWin() {
  if (player.y === 0 && player.isColliding === false) {
    player.hasWon = true;
  }
}

function gameOutcome() {
  player.draw();
  player.hasWon ? (currentLevel += 1) : (currentLevel = 0);
  setTimeout(init, 1000);
}
