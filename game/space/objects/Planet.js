import Renderable from '../../core/Renderable';
import Engine from '../../core/Engine';
import {opositeDirection} from "../SpaceScene";

export default class Planet extends Renderable {

  constructor (x, y, width, height, type) {
    super(x, y, width, height);
    this.type = type;
    this.image = this.getImage();

    this.lastVertical = "left";
    this.lastHorizontal = "up";
    this.lastVerticalFake = "left";
    this.lastHorizontalFake = "up";
    this.aligned = false;
  }

  getImage() {
    return Engine.getAsset(this.type);
  }

  render(context) {
    this.renderInLocation(this.x, this.y, context);

    if (this.square) {
      this.renderSelectionBox(this.x, this.y, context, 'white');
    }
  }

  renderSelectionBox(x, y, context, color) {
    context.fillStyle = color;
    context.globalAlpha = 0.2;
    context.fillRect(x, y, this.width, this.height);
    context.globalAlpha = 1.0;

  }

  renderInLocation(x, y, context) {
    context.drawImage(this.image, x, y, this.width, this.height);

    if (this.state === 0) {
      this.renderSelectionBox(x, y, context, 'red')
    }
  }

  align(planet) {
    this.lastVerticalFake = planet.lastVertical;
    this.lastHorizontalFake = planet.lastHorizontal;
    this.aligned = true;
  }

  getDirectionForCat (direction, fake) {
    if (direction === "left" || direction === "right") {
      if (fake && !this.aligned) {
        this.lastHorizontalFake = opositeDirection(this.lastHorizontalFake);
        return this.lastHorizontalFake;
      } else {
        if (!fake) {
          this.lastHorizontal = opositeDirection(this.lastHorizontal);
        }
        return this.lastHorizontal;
      }
    } else {
      if (fake && !this.aligned) {
        this.lastVerticalFake = opositeDirection(this.lastVerticalFake);
        return this.lastVerticalFake
      } else {
        if (!fake) {
          this.lastVertical = opositeDirection(this.lastVertical);
        }
        return this.lastVertical;
      }
    }
  }

  setSquare(square) {
    this.aligned = false;
    if (this.square && square) {
      this.square.setFake(null);
    }

    if (this.square === square) {
      this.square = null;
    } else {
      this.square = square;
    }
  }

  setState(name) {
    this.state = name;
  }
}

export const TYPES = {
  "RED": 'RED',
  "GREEN": 'GREEN',
  "BLUE": 'BLUE',
  "SINGULARITY": "SINGULARITY",
  "CAT": "CAT"
};