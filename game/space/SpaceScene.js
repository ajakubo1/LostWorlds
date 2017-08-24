import Scene from '../core/Scene';
import Engine from '../core/Engine';
import PlanetSquare from './objects/PlanetSquare';
import ProbeSquare from './objects/ProbeSquare';
import Background from './objects/Background';

export default class SpaceScene extends Scene {

  constructor(config) {
    super();
    this.width = config.width;
    this.height = config.height;
    this.planets = config.planets;

    this.objects = [];

    let i, j;

    this.objects.push(new Background(0, 0, Engine.width, Engine.height));

    const widthPlanetSquares = 50 * this.width;
    const heightPlanetsSquare = 50 * this.height;

    this.limitX1 = Engine.width / 2 - widthPlanetSquares / 2;
    this.limitY1 = Engine.height / 2 - heightPlanetsSquare / 2;
    this.limitX2 = Engine.width / 2 + widthPlanetSquares / 2;
    this.limitY2 = Engine.height / 2 + heightPlanetsSquare / 2;

    for (i = 0; i < this.width; i += 1) {
      for (j = 0; j < this.height; j += 1) {
        this.objects.push(new PlanetSquare(
          this.limitX1 + i * 50,
          this.limitY1 + j * 50,
          50, 50
        ));
      }
    }

    for (i = 0; i < this.width; i += 1) {
      this.objects.push(new ProbeSquare(
        this.limitX1 + i * 50,
        10,
        50, 50
      ));

      this.objects.push(new ProbeSquare(
        this.limitX1 + i * 50,
        Engine.height - 10 - 50,
        50, 50
      ));
    }

    for (i = 0; i < this.height; i += 1) {
      this.objects.push(new ProbeSquare(
        150 + 10,
        this.limitY1 + i * 50,
        50, 50
      ));

      this.objects.push(new ProbeSquare(
        Engine.width - 150 - 10 - 50,
        this.limitY1 + i * 50,
        50, 50
      ));
    }
  }

  update() {

  }

  render(context) {
    context.clearRect(0, 0, Engine.width, Engine.height);

    context.fillRect(0, 0, Engine.width, Engine.height);

    let i;
    const length = this.objects.length;
    for (i = 0; i < length ; i += 1) {
      this.objects[i].render(context);
    }
  }


}