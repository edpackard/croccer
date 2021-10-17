class Croc extends GameActor {
  constructor(context, x, y, vx) {
    super(context, x, y, vx);
    this.width = 50;
    this.height = 50;
  }
  draw() {
    this.context.strokeStyle = "#000000";
    this.context.strokeRect(this.x, this.y, this.width, this.height);
  }
  update(secondsPassed) {
    this.x += this.vx * secondsPassed;
    if (this.x > 750) {
      this.x = 0;
    }
  }
}
