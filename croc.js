class Croc extends GameActor {
  constructor(context, x, y, vx) {
    super(context, x, y, vx);
    this.width = 50;
    this.height = 50;
    this.img = new Image();
    this.img.src = vx > 0 ? "croc.png" : "croc2.png";
  }
  draw() {
    this.context.drawImage(this.img, this.x, this.y);
  }
  update(secondsPassed) {
    this.x += this.vx * secondsPassed;
    if (this.x > 750) {
      this.x = -50;
    }
    if (this.x < -50) {
      this.x = 750;
    }
  }
}
