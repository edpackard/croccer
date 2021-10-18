"use strict";

let canvas;
let context;
let enemyObjects;
let player;
let secondsPassed;
let oldTimeStamp;
let KeyPresses;

let currentLevel = 1;
let highScore = 0;
const fast = 90;
const slow = 35;
const medium = 48;

const KeyHelper = { right: 39, left: 37, up: 38, down: 40 };
const leftCrocsX = [100, 367, 634];
const leftCrocsX2 = [150, 417, 684];
const leftCrocsY = [50, 250];
const rightCrocsX = [0, 200, 400, 600];
let rightCrocsY = [0, 100];
const bonusCrocsX = [0, 133, 266, 400, 533];

window.onload = init();

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function init() {
  document.querySelector(`span[class='level']`).innerText = currentLevel;
  document.querySelector(`span[class='highscore']`).innerText = highScore;
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
  enemyObjects = [];
  createCrocs();
}

function createCrocs() {
  let speedBoost = currentLevel * 5;
  rightCrocsY = currentLevel >= 5 ? [0, 200] : [0, 100];
  crocRow(leftCrocsX, leftCrocsY, -fast - speedBoost);
  crocRow(rightCrocsX, rightCrocsY, medium + speedBoost);
  if (currentLevel >= 5) {
    crocRow(bonusCrocsX, [100], slow + speedBoost);
  }
  if (currentLevel >= 8) {
    crocRow(leftCrocsX2, [150], -medium - speedBoost);
  }
  if (currentLevel >= 15) {
    crocRow(bonusCrocsX, [300], -slow + speedBoost);
  }
}

function newCroc(x, y, speed) {
  return new Croc(context, x, y, speed);
}

function crocRow(crocsX, crocsY, speed) {
  let index = 0;
  for (const crocY of crocsY) {
    let offset = index % 2 === 0 ? 50 : 0;
    index += 1;
    for (const crocX of crocsX) {
      enemyObjects.push(newCroc(crocX + offset, crocY, speed));
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
  player.hasWon ? (currentLevel += 1) : (currentLevel = 1);
  if (currentLevel - 1 > highScore) {
    highScore = currentLevel - 1;
  }
  setTimeout(init, 1000);
}
