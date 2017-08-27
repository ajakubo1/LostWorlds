export default class Renderable {
  constructor (x = 0, y = 0, width = 0, height = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = this.getImage();
  }

  inRange(x, y) {
    if (x > this.x && x < this.x + this.width &&
      y > this.y && y < this.y + this.height) {
      return true;
    }
    return false;
  }

  getImage() {

  }

  render(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}