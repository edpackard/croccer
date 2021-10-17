class Player extends GameActor {
  constructor(context, x, y, vx, vy) {
    super(context, x, y, vx, vy);
    this.width = 50;
    this.height = 50;
    this.right = true;
    this.left = true;
    this.up = true;
    this.down = true;
  }
  draw() {
    this.context.strokeStyle = this.isColliding ? "#ff8080" : "#ffffff";
    this.context.strokeRect(this.x, this.y, this.width, this.height);
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