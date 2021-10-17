class Croc extends GameActor {
  constructor(context, x, y, vx, vy) {
    super(context, x, y, vx, vy);
    this.width = 50;
    this.height = 50;
  }
  draw() {
    this.context.strokeStyle = this.isColliding ? "#ff8080" : "#000000";
    this.context.strokeRect(this.x, this.y, this.width, this.height);
  }
  update(secondsPassed) {
    this.x += this.vx * secondsPassed;
    //this.y += this.vy * secondsPassed;
    if (this.x > 750) {
      this.x = 0;
    }
  }
}
