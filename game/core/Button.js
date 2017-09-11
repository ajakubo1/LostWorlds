import Renderable from './Renderable';
import {fillText} from './Letters';

export default class Button extends Renderable {
  constructor(x, y, width, height, text, onClick, color = '#dddddd', hoverColor = '#ffffff', textColor = '#000000') {
    super(x, y, width, height);
    this.text = text;
    this.color = color;
    this.colorHover = hoverColor;
    this.textColor = textColor;
    this.state = 0;
    this.onClick = onClick;
    this.size = 2;
  }

  setFontSize(size) {
    this.size = size;
  }

  setNormal() {
    this.state = 0;
  }

  setHover() {
    this.state = 1;
  }

  render(context) {
    if (!this.noRender) {
      if(!this.state) {
        context.fillStyle = this.color;
      } else {
        context.fillStyle = this.colorHover;
      }

      context.fillRect(this.x, this.y, this.width, this.height);

      fillText(this.x, this.y, this.width, this.height, this.text, context, this.textColor, this.size)
    }
  }

  pressed(x, y) {
    if (this.inRange(x, y)) {
      this.onClick();
      return true;
    }
    return false;
  }

  moved(x, y) {
    if (!this.state && this.inRange(x, y)) {
      this.setHover();
    } else if(this.state && !this.inRange(x, y)) {
      this.setNormal();
    }
  }

  disabled() {
    this.noRender = true;
  }
}