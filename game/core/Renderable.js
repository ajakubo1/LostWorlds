export default class Renderable {
  constructor (x, y, widht, height) {
    this.x = x;
    this.y = y;
    this.width = widht;
    this.height = height;
    this.image = this.getImage();
  }

  getImage() {

  }

  render(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}