import Renderable from './Renderable';
import {fill} from './Letters';

export default class Button extends Renderable {
  constructor(x, y, width, height, text, color = '#222299', hoverColor = '#1111FF', onClick) {
    super(x, y, width, height);
    this.text = text;
    this.color = color;
    this.colorHover = hoverColor;
    this.state = 0;
    this.onClick = onClick;
  }

  setNormal() {
    this.state = 0;
  }

  setHover() {
    this.state = 1;
  }

  render(context) {
    if(this.state === 0) {
      context.fillStyle = this.color;
    } else {
      context.fillStyle = this.colorHover;
    }

    context.fillRect(this.x, this.y, this.width, this.height);

    fill(this.x, this.y, this.width, this.height, this.text, context, 'red', 2)
  }

  click() {
    this.onClick();
  }
}