import Renderable from '../../core/Renderable';
import Engine from '../../core/Engine';
import { IDENTIFIERS as ASSET_IDENTIFIERS } from '../../core/Assets';

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
    this.step = 0;
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
  }

  drawLines(context) {
    const length = this.pathX.length;
    let beginX = this.pathX[0] + 5;
    let beginY = this.pathY[0] + 5;
    let currentDirection = this.directionHistory[0];
    let i;

    context.beginPath();
    context.strokeStyle = "red";
    if (this.fake) {
      context.lineWidth = 2;
    } else {
      context.lineWidth = 4;
    }

    context.moveTo(beginX,beginY);
    for (i = 1; i < length; i += 1) {
      if (currentDirection !== this.directionHistory[i]) {
        let x = this.pathX[i-1];
        let y = this.pathY[i-1];
        context.lineTo(this.pathX[i-1] + 5,this.pathY[i-1] + 5);
        currentDirection = this.directionHistory[i]
      }
    }
    context.lineTo(this.pathX[length-1] + 5,this.pathY[length-1] + 5);
    context.stroke();
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

    let color = "#FF0000";
    if (this.step === 3 || this.step === 4 || this.step === 5) {
      color = "#C00000";
    } else if (this.step === 6 || this.step === 7 || this.step === 8) {
      color = "#700000";
    }

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

  update() {

    this.step += 1;

    if (this.step === 9) {
      this.step = 0;
    }

    if (!this.finished) {

      const lastElement = this.pathX.length - 1;
      const prevX = this.pathX[lastElement];
      const prevY = this.pathY[lastElement];

      if (prevX < this.x - 50 || prevX > this.width + 40 ||
        prevY < this.y - 50 || prevY > this.height + 40) {
        this.finished = true;
        return;
      }

      if (prevX > this.x && prevX < this.width &&
        prevY > this.y && prevY < this.height) {
        if ((lastElement + 3) % 5 === 0) {
          this.direction = this.scene.determineDirection(prevX, prevY, this.direction, this.fake)
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
    }
  }
}