export default class Renderable {
  constructor (x = 0, y = 0, width = 0, height = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = this.getImage();
  }

  getImage() {

  }

  render(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}