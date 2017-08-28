import Renderable from './Renderable';

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


    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = 'small-caps bold 14px Georgia';
    context.fillRect(this.x, this.y, this.width, this.height);
    context.fillStyle = "#ff0000";
    context.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
  }

  click() {
    this.onClick();
  }
}