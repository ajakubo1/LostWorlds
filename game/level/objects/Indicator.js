import Renderable from '../../core/Renderable';

export default class Indicator extends Renderable {
  constructor(x, y, width, height, color = '#AAAA00') {
    super(x, y, width, height);
    this.color = color;
    this.time = 0;
    this.maxTime = 10;
    this.interval = 1;
  }

  update() {
    this.time = this.time + this.interval;

    if (this.time === this.maxTime) {
      this.interval = -1;
    }

    if (this.time === 0) {
      this.interval = 1;
    }
  }

  render(context) {
    context.globalAlpha = this.time / this.maxTime / 1.0;
    context.strokeStyle = this.color;
    context.lineWidth = 5;

    context.strokeRect(this.x, this.y, this.width, this.height);
    context.globalAlpha = 1.0;
  }
}