import Scene from '../core/Scene';
import Engine from '../core/Engine';
import PlanetSquare from './objects/PlanetSquare';
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

    for (i = 0; i < this.width; i += 1) {
      for (j = 0; j < this.height; j += 1) {
        this.objects.push(new PlanetSquare(i * 50, j * 50, 50, 50))
      }
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