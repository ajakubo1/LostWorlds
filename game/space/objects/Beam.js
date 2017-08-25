import Renderable from '../../core/Renderable';
import Engine from '../../core/Engine';
import { IDENTIFIERS as ASSET_IDENTIFIERS } from '../../core/Assets';

export default class Beam extends Renderable {
  getImage() {
    return Engine.getAsset(ASSET_IDENTIFIERS.LASER)
  }

  setProbe(probe) {
    this.finished = false;
    this.tick = 0;
    this.probe = probe;
    this.pathX = [];
    this.pathY = [];
    this.limitX1 = 150 + 10 + 50;
    this.limitX2 = Engine.width - 150 - 10 - 50;
    this.limitY1 = 10 + 50;
    this.limitY2 = Engine.height - 10 - 50;
    if (this.probe.x < this.limitX1) {
      this.pathX.push(this.probe.x + this.probe.width);
      this.pathY.push(this.probe.y + 20);
      this.direction = 'right'
    } else if (this.probe.x === this.limitX2) {
      this.pathX.push(this.probe.x - 10);
      this.pathY.push(this.probe.y + 20);
      this.direction = 'left'
    } else if (this.probe.y < this.limitY1) {
      this.pathX.push(this.probe.x + 20);
      this.pathY.push(this.probe.y + this.probe.width);
      this.direction = 'down'
    } else if (this.probe.y === this.limitY2) {
      this.pathX.push(this.probe.x + 20);
      this.pathY.push(this.probe.y - 10);
      this.direction = 'up'
    }

  }

  render(context) {
    const length = this.pathX.length;
    let i;
    for (i = 0; i < length; i += 1) {
      context.drawImage(this.image, this.pathX[i], this.pathY[i], 10, 10);
    }
  }

  update() {
    if (!this.finished) {
      this.tick += 1;
      if (this.tick === 1) {
        this.tick = 0;
        const lastElement = this.pathX.length - 1;
        const prevX = this.pathX[lastElement];
        const prevY = this.pathY[lastElement];

        if (prevX < this.limitX1 || prevX > this.limitX2 ||
          prevY < this.limitY1 || prevY > this.limitY2) {
          this.finished = true;
          return;
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
      }
    }
  }
}