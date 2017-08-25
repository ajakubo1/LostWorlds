import Renderable from '../../core/Renderable';
import Engine from '../../core/Engine';
import { IDENTIFIERS as ASSET_IDENTIFIERS } from '../../core/Assets';

export default class Beam extends Renderable {
  getImage() {
    return Engine.getAsset(ASSET_IDENTIFIERS.LASER)
  }

  fakeIt() {
    this.image = Engine.getAsset(ASSET_IDENTIFIERS.LASER_FAKE)
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

  }

  render(context) {
    const length = this.pathX.length;
    let i;
    for (i = 0; i < length; i += 1) {
      if (this.fake) {
        context.drawImage(this.image, this.pathX[i], this.pathY[i], 10, 10);
      } else {
        if (this.pathX[i] < this.x || this.pathX[i] > this.width - 10 ||
          this.pathY[i] < this.y || this.pathY[i] > this.height - 10) {
          context.drawImage(this.image, this.pathX[i], this.pathY[i], 10, 10);
        }
      }
    }
  }

  update() {
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