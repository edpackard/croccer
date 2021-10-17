class Croc extends GameActor {
  constructor(context, x, y, vx) {
    super(context, x, y, vx);
    this.width = 50;
    this.height = 50;
    this.img = new Image();
    this.img.src = "croc.png";
  }
  draw() {
    // can delete hitbox draw when sprite in place
    //this.context.strokeStyle = "#000000"; // hitbox
    //this.context.strokeRect(this.x, this.y, this.width, this.height); // hitbox
    this.context.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  update(secondsPassed) {
    this.x += this.vx * secondsPassed;
    if (this.x > 750) {
      this.x = 0;
    }
  }
}
