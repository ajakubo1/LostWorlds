import Scene from '../core/Scene';
import Engine from '../core/Engine';
import PlanetSquare from './objects/PlanetSquare';
import ProbeSquare from './objects/ProbeSquare';
import Background from './objects/Background';
import Panel from './objects/Panel';
import Beam from "./objects/Beam";

export default class SpaceScene extends Scene {

  constructor(config) {
    super();
    this.clickedElement = null;
    this.beam = null;
    this.fake = null;

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
        this.limitY1 - 100,
        50, 50
      );
      this.objects.push(obj);
      this.probeSquares[currentProbeSquare++] = obj;

      obj = new ProbeSquare(
        this.limitX1 + i * 50,
        this.limitY2 + 50,
        50, 50
      );
      this.objects.push(obj);
      this.probeSquares[currentProbeSquare++] = obj;
    }

    for (i = 0; i < this.height; i += 1) {
      obj = new ProbeSquare(
        this.limitX1 - 100,
        this.limitY1 + i * 50,
        50, 50
      );
      this.objects.push(obj);
      this.probeSquares[currentProbeSquare++] = obj;

      obj = new ProbeSquare(
        this.limitX2 + 50,
        this.limitY1 + i * 50,
        50, 50
      );
      this.objects.push(obj);
      this.probeSquares[currentProbeSquare++] = obj;
    }
  }

  determineDirection (x, y, direction, fake) {
    return direction;
  }

  pressed(x, y) {
    let i;
    console.info('pressed', x, y);
    if (x > 160 && x < Engine.width - 160) {
      if (x > this.limitX1 && x < this.limitX2 && y > this.limitY1 && y < this.limitY2) {
        //Squares
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
        const length = this.probeSquares.length;
        for (i = 0; i < length; i += 1) {
          const square = this.probeSquares[i];
          if (square.inRange(x, y)) {
            this.clickedElement = square;
            this.clickedElement.setState('active');
            this.beam = new Beam(this.limitX1, this.limitY1, this.limitX2, this.limitY2);
            this.beam.setProbe(square);
            this.beam.setScene(this);
            this.fake = new Beam(this.limitX1, this.limitY1, this.limitX2, this.limitY2);
            this.fake.setProbe(square);
            this.fake.setScene(this);
            this.fake.fakeIt();
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
    if (this.clickedElement !== null) {
      this.clickedElement.setState('inactive');
      this.clickedElement = null;
    }
    if (this.beam !== null) {
      this.beam = null;
      this.fake = null;
    }
  }

  moved(x, y) {
    console.info('moved', x, y);
    if (this.clickedElement !== null) {
      this.clickedElement.setState('inactive');
      this.clickedElement = null;
    }
    if (this.beam !== null) {
      this.beam = null;
      this.fake = null;
    }
  }

  update() {
    if (this.beam !== null) {
      this.beam.update();
      this.fake.update();
    }
  }

  render(context) {
    context.clearRect(0, 0, Engine.width, Engine.height);
    let i;
    const length = this.objects.length;
    for (i = 0; i < length ; i += 1) {
      this.objects[i].render(context);
    }

    if (this.beam !== null) {
      this.fake.render(context);
      this.beam.render(context);
    }
  }


}