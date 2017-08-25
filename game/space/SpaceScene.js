import Scene from '../core/Scene';
import Engine from '../core/Engine';
import PlanetSquare from './objects/PlanetSquare';
import ProbeSquare from './objects/ProbeSquare';
import Background from './objects/Background';
import Panel from './objects/Panel';

export default class SpaceScene extends Scene {

  constructor(config) {
    super();
    this.clickedElement = null;

    this.width = config.width;
    this.height = config.height;
    this.planets = config.planets;

    this.probeSquares = new Array(this.width * 2 + this.height * 2);
    let currentProbeSquare = 0;
    this.planetSquares = new Array(this.width * this.height);
    let currentPlanetSquare = 0;

    this.objects = [];

    let i, j, obj;

    this.objects.push(new Background(0, 0, Engine.width, Engine.height));
    this.objects.push(new Panel(0, 0, 150, Engine.height));
    this.objects.push(new Panel(Engine.width - 150, 0, 150, Engine.height));

    const widthPlanetSquares = 50 * this.width;
    const heightPlanetsSquare = 50 * this.height;

    this.limitX1 = Engine.width / 2 - widthPlanetSquares / 2;
    this.limitY1 = Engine.height / 2 - heightPlanetsSquare / 2;
    this.limitX2 = Engine.width / 2 + widthPlanetSquares / 2;
    this.limitY2 = Engine.height / 2 + heightPlanetsSquare / 2;

    for (i = 0; i < this.width; i += 1) {
      for (j = 0; j < this.height; j += 1) {
        obj = new PlanetSquare(
          this.limitX1 + i * 50,
          this.limitY1 + j * 50,
          50, 50
        );
        this.objects.push(obj);
        this.planetSquares[currentPlanetSquare++] = obj
      }
    }

    for (i = 0; i < this.width; i += 1) {
      obj = new ProbeSquare(
        this.limitX1 + i * 50,
        10,
        50, 50
      );
      this.objects.push(obj);
      this.probeSquares[currentProbeSquare++] = obj;

      obj = new ProbeSquare(
        this.limitX1 + i * 50,
        Engine.height - 10 - 50,
        50, 50
      );
      this.objects.push(obj);
      this.probeSquares[currentProbeSquare++] = obj;
    }

    for (i = 0; i < this.height; i += 1) {
      obj = new ProbeSquare(
        150 + 10,
        this.limitY1 + i * 50,
        50, 50
      );
      this.objects.push(obj);
      this.probeSquares[currentProbeSquare++] = obj;

      obj = new ProbeSquare(
        Engine.width - 150 - 10 - 50,
        this.limitY1 + i * 50,
        50, 50
      );
      this.objects.push(obj);
      this.probeSquares[currentProbeSquare++] = obj;
    }
  }

  pressed(x, y) {
    let i;
    console.info('pressed', x, y);
    if (x > 160 && x < Engine.width - 160) {
      if (x > this.limitX1 && x < this.limitX2 && y > this.limitY1 && y < this.limitY2) {
        //Squares
        console.info('Squares')
        const length = this.planetSquares.length;
        for (i = 0; i < length; i += 1) {
          const square = this.planetSquares[i];
          if (square.inRange(x, y)) {
            this.clickedElement = square;
            this.clickedElement.setState('active');
            break;
          }
        }
      } else {
        //Probes
        console.info('Probes')
        const length = this.probeSquares.length;
        for (i = 0; i < length; i += 1) {
          const square = this.probeSquares[i];
          if (square.inRange(x, y)) {
            this.clickedElement = square;
            this.clickedElement.setState('active');
            break;
          }
        }
      }
    } else {
      //Screens
      console.info('Screens')
    }
  }

  released() {
    console.info('released');
    if (this.clickedElement != null) {
      this.clickedElement.setState('inactive');
      this.clickedElement = null;
    }
  }

  moved(x, y) {
    console.info('moved', x, y);
    if (this.clickedElement != null) {
      this.clickedElement.setState('inactive');
      this.clickedElement = null;
    }
  }

  update() {

  }

  render(context) {
    context.clearRect(0, 0, Engine.width, Engine.height);
    let i;
    const length = this.objects.length;
    for (i = 0; i < length ; i += 1) {
      this.objects[i].render(context);
    }
  }


}