import Renderable from '../../core/Renderable';
import Engine from '../../core/Engine';
import { IDENTIFIERS as ASSET_IDENTIFIERS } from '../../core/Assets';

export default class Scientist extends Renderable {
  getImage() {
    this.colors = [
      "#1bd9c9", //coat 1
      "#2eec2b", //eyes 2
      "#ba1717", //mouth 3
      "#eeeab1", //skin 4
      "#6d2904", //hair 5
      "#271003", //pants 6
      "#000000", //glasses, shoes 7
      "#ffffff", //eyes, shirt 8
    ];

    this.guy = [
      [0, 0, 5, 0, 5, 0, 5, 0, 0],
      [0, 5, 5, 5, 5, 5, 5, 5, 0],
      [0, 0, 5, 4, 4, 4, 5, 0, 0],
      [0, 0, 7, 7, 4, 7, 7, 0, 0],
      //eyes
      [0, 0, 7, 7, 4, 7, 7, 0, 0],
      //mouth
      [0, 0, 0, 4, 4, 4, 0, 0, 0],
      [0, 0, 0, 0, 4, 0, 0, 0, 0],
      [0, 0, 1, 1, 4, 1, 1, 0, 0],
      [0, 1, 1, 8, 8, 8, 1, 1, 0],
      [1, 0, 1, 8, 7, 8, 1, 0, 1],
      [1, 0, 1, 8, 8, 8, 1, 0, 1],
      [1, 0, 1, 8, 7, 8, 1, 0, 1],
      [1, 0, 1, 8, 8, 8, 1, 0, 1],
      [1, 0, 1, 8, 7, 8, 1, 0, 1],
      [1, 0, 1, 8, 8, 8, 1, 0, 1],
      [4, 0, 1, 6, 6, 6, 1, 0, 4],
      [0, 0, 1, 6, 6, 6, 1, 0, 0],
      [0, 0, 1, 6, 1, 6, 1, 0, 0],
      [0, 0, 1, 6, 1, 6, 1, 0, 0],
      [0, 0, 1, 6, 1, 6, 1, 0, 0],
      [0, 0, 0, 6, 0, 6, 0, 0, 0],
      [0, 0, 0, 6, 0, 6, 0, 0, 0],
      [0, 0, 7, 7, 0, 7, 7, 0, 0],

    ];

    this.mouth = [
      [
        [0, 0, 0, 4, 4, 4, 0, 0, 0],
        [0, 0, 0, 4, 3, 4, 0, 0, 0],
      ],
      [
        [0, 0, 0, 4, 4, 4, 0, 0, 0],
        [0, 0, 0, 3, 3, 3, 0, 0, 0],
      ],
      [
        [0, 0, 0, 4, 3, 4, 0, 0, 0],
        [0, 0, 0, 3, 3, 3, 0, 0, 0],
      ],
    ];

    this.eyes = [
      [
        [0, 7, 8, 8, 7, 8, 8, 7, 0],
        [0, 7, 8, 2, 7, 8, 2, 7, 0],
      ],
      [
        [0, 7, 8, 8, 7, 8, 8, 7, 0],
        [0, 7, 2, 8, 7, 2, 8, 7, 0],
      ],
      [
        [0, 7, 2, 8, 7, 2, 8, 7, 0],
        [0, 7, 8, 8, 7, 8, 8, 7, 0],
      ],
      [
        [0, 7, 8, 2, 7, 8, 2, 7, 0],
        [0, 7, 8, 8, 7, 8, 8, 7, 0],
      ],
    ];

    this.size = 8;

    this.eyeTick = 0;
    this.eyeTickLimit = Math.floor(Math.random() * 100) + 20;
    this.mouthTick = 0;

    this.currentMouth = this.mouth[0];

    this.currentEyes = this.eyes[0];

    return null
  }

  setSize(size) {
    this.size = size;
  }

  update() {
    this.eyeTick += 1;

    if (this.eyeTick === this.eyeTickLimit) {
      this.eyeTick = 0;
      this.eyeTickLimit = Math.floor(Math.random() * 100) + 20;
      this.currentEyes = this.eyes[Math.floor(Math.random() * this.eyes.length)];
    }
  }

  renderLine(context, line, y) {
    let j;

    for (j = 0; j < 9; j += 1) {
      const pixel = line[j];
      if (pixel !== 0) {

        context.fillStyle = this.colors[pixel-1];
        context.fillRect(
          this.x + j * this.size,
          this.y + y * this.size,
          this.size, this.size
        )
      }
    }
  }

  render(context) {
    const length = this.guy.length;
    let i, j;
    for (i = 0 ; i < length; i += 1) {

      if(i === 4) {
        for (j = 0; j < this.currentEyes.length; j += 1) {
          this.renderLine(context, this.currentEyes[j], i + j);
        }
      }

      if (i === 5) {
        for (j = 0; j < this.currentMouth.length; j += 1) {
          this.renderLine(context, this.currentMouth[j], i + this.currentEyes.length + j);
        }
      }

      let renderY = i;

      if (i > 3) {
        renderY += this.currentEyes.length;
      }

      if (i > 4) {
        renderY += this.currentMouth.length;
      }

      this.renderLine(context, this.guy[i], renderY);
    }
  }
}