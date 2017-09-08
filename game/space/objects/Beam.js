import Renderable from '../../core/Renderable';
import Engine from '../../core/Engine';
import { IDENTIFIERS as ASSET_IDENTIFIERS } from '../../core/Assets';
import {TYPES} from "./Planet";

let colors = {
  "RED": ["#CC0000", "#FF0033", "#CC0066"],
  "GREEN": ["#006600", "#009900", "#00CC00"],
  "BLUE": ["#0000FF", "#0033FF", "#0066FF"]
};

let sideColors = {
  "RED": ["#F80000", "#D80000", "#A80000"],
  "GREEN": ["#33FF00", "#33CC00", "#339900"],
  "BLUE": ["#3366FF", "#3333FF", "#3300FF"]
};

export default class Beam extends Renderable {
  getImage() {
    return null;
  }

  fakeIt() {
    this.fake = true;
  }

  setScene(scene) {
    this.scene = scene;
  }

  setProbe(probe) {
    this.fake = false;
    this.finished = false;
    this.probe = probe;
    this.pathX = [];
    this.pathY = [];
    this.directionHistory = [];
    this.colorHistory = [];
    this.step = 0;
    this.currentColor = TYPES.RED;
    if (this.probe.x < this.x) {
      this.pathX.push(this.probe.x + this.probe.width);
      this.pathY.push(this.probe.y + 20);
      this.direction = 'right'
    } else if (this.probe.x > this.width) {
      this.pathX.push(this.probe.x - 10);
      this.pathY.push(this.probe.y + 20);
      this.direction = 'left'
    } else if (this.probe.y < this.y) {
      this.pathX.push(this.probe.x + 20);
      this.pathY.push(this.probe.y + this.probe.width);
      this.direction = 'down'
    } else if (this.probe.y > this.height) {
      this.pathX.push(this.probe.x + 20);
      this.pathY.push(this.probe.y - 10);
      this.direction = 'up'
    }
    this.directionHistory.push(this.direction);
    this.colorHistory.push(this.currentColor);
  }

  drawBeam(context, lineWidth, fill, opacity = 1.0) {
    const length = this.pathX.length;
    let beginX = this.pathX[0] + 5;
    let beginY = this.pathY[0] + 5;
    let currentDirection = this.directionHistory[0];
    let i;
    context.beginPath();
    context.strokeStyle = fill;

    context.lineWidth = lineWidth;

    context.globalAlpha = opacity;

    context.moveTo(beginX,beginY);
    for (i = 1; i < length; i += 1) {
      if (currentDirection !== this.directionHistory[i]) {
        context.lineTo(this.pathX[i-1] + 5,this.pathY[i-1] + 5);
        currentDirection = this.directionHistory[i]
      }
    }
    context.lineTo(this.pathX[length-1] + 5,this.pathY[length-1] + 5);
    context.stroke();
    context.globalAlpha = 1.0;
  }

  getActualColor(colorset) {
    let color = colorset[0];
    if (this.step > 2 && this.step < 6) {
      color = colorset[1];
    } else if (this.step > 5) {
      color = colorset[2];
    }
    return color;
  }

  getHelperColor() {
    return this.getActualColor(sideColors[this.currentColor]);
  }

  getColor() {
    return this.getActualColor(colors[this.currentColor]);
  }

  drawLines(context) {
    if (this.fake) {
      this.drawBeam(context, 2, this.getColor(), 0.2)
    } else {
      this.drawBeam(context, 6, this.getHelperColor());
      this.drawBeam(context, 3, this.getColor());
      this.drawBeam(context, 1, "white");
    }
  }

  drawPoint(context) {
    context.save();
    const length = this.pathX.length - 1;
    const x = this.pathX[length] + 5;
    const y = this.pathY[length] + 5;
    let range = 15;
    if (this.fake) {
      range = 8
    }
    let grd = context.createRadialGradient(x, y, 1, x, y, range);

    let color = this.getColor();
    grd.addColorStop(0, color);
    grd.addColorStop(1, "transparent");

    context.fillStyle = grd;
    context.beginPath();
    context.arc(x, y, 20, 0, 2.01*Math.PI);
    context.shadowBlur = 20;
    context.shadowColor = color;
    context.fill();
    context.restore();
  }

  render(context) {
    this.drawLines(context);
    this.drawPoint(context);
  }

  opositeDirection(direction) {
    if (direction === 'left') {
      return 'right';
    } else if (direction === 'right') {
      return 'left';
    } else if (direction === 'up') {
      return 'down';
    } else if (direction === 'down') {
      return 'up';
    }
  }

  update() {

    this.step += 1;

    if (this.step === 9) {
      this.step = 0;
    }

    if (!this.finished) {

      let lastElement = this.pathX.length - 1;
      let prevX = this.pathX[lastElement];
      let prevY = this.pathY[lastElement];

      if (prevX < this.x - 50 || prevX > this.width + 40 ||
        prevY < this.y - 50 || prevY > this.height + 40) {
        this.finished = true;
        return;
      }

      if (prevX > this.x && prevX < this.width &&
        prevY > this.y && prevY < this.height) {
        if ((lastElement + 3) % 5 === 0) {
          let directions = this.scene.determineDirection(prevX, prevY, this.direction, this.fake);
          this.direction = directions[0];
          this.currentColor = colors[directions[1]] ? directions[1] : this.currentColor;
          const displacement = directions[2];
          if (displacement) {
            console.info(displacement);
            this.pathX.push(displacement[0]);
            this.pathY.push(displacement[1]);
            this.directionHistory.push(this.opositeDirection(this.direction));
            this.colorHistory.push(this.currentColor);
            lastElement = this.pathX.length - 1;
            prevX = this.pathX[lastElement];
            prevY = this.pathY[lastElement];
          }
        }
      }

      if (this.direction === 'stop') {
        this.finished = true;
      }

      if (this.direction === 'up') {
        this.pathX.push(prevX);
        this.pathY.push(prevY - 10)
      } else if (this.direction === 'down') {
        this.pathX.push(prevX);
        this.pathY.push(prevY + 10)
      } else if (this.direction === 'left') {
        this.pathX.push(prevX - 10);
        this.pathY.push(prevY);
      } else if (this.direction === 'right') {
        this.pathX.push(prevX + 10);
        this.pathY.push(prevY);
      }

      this.directionHistory.push(this.direction);
      this.colorHistory.push(this.currentColor);
    }
  }
}