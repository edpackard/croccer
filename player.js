class Player extends GameActor {
  constructor(context, x, y, vx, vy) {
    super(context, x, y, vx, vy);
    this.width = 50;
    this.height = 50;
    this.right = true;
    this.left = true;
    this.up = true;
    this.down = true;
    this.img = new Image();
    this.img.src = "player.png";
    this.hasWon = false;
  }
  draw() {
    if (this.isColliding) {
      this.img.src = "gameover.png";
    }
    if (this.hasWon) {
      this.img.src = "success.png";
    }
    this.context.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  update(keyPress) {
    if (keyPress.right && this.right && this.x < 700) {
      this.x += this.vx;
      this.right = false;
    }
    if (keyPress.left && this.left && this.x > 0) {
      this.x -= this.vx;
      this.left = false;
    }
    if (keyPress.up && this.up && this.y > 0) {
      this.y -= this.vy;
      this.up = false;
    }
    if (keyPress.down && this.down && this.y < 350) {
      this.y += this.vy;
      this.down = false;
    }
  }
}
