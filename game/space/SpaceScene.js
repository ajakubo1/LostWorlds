import Scene from '../core/Scene';
import Engine from '../core/Engine';
import PlanetSquare from './objects/PlanetSquare';
import ProbeSquare from './objects/ProbeSquare';
import Background from './objects/Background';
import Panel from './objects/Panel';
import Beam from "./objects/Beam";
import Planet from "./objects/Planet";

export default class SpaceScene extends Scene {

  constructor(config) {
    super();
    this.clickedElement = null;
    this.selectedPlanet = null;
    this.beam = null;
    this.fake = null;

    this.width = config.width;
    this.height = config.height;
    this.planets = config.planets;

    this.fakeDetermine = new Array(this.width);
    this.determine = new Array(this.width);

    this.probeSquares = new Array(this.width * 2 + this.height * 2);
    let currentProbeSquare = 0;
    this.planetSquares = new Array(this.width * this.height);
    let currentPlanetSquare = 0;

    this.objects = [];

    let i, j, obj;

    this.fakePlanets = new Array(this.planets.length);

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
      this.fakeDetermine[i] = new Array(this.height);
      this.determine[i] = new Array(this.height);

      for (j = 0; j < this.height; j += 1) {
        obj = new PlanetSquare(
          this.limitX1 + i * 50,
          this.limitY1 + j * 50,
          50, 50
        );
        obj.setId(i, j);
        this.objects.push(obj);
        this.planetSquares[currentPlanetSquare++] = obj;

        this.fakeDetermine[i][j] = null;
        this.determine[i][j] = null;
      }
    }

    this.fillDirections();

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

    for (i = 0; i < this.planets.length; i += 1) {
      const obj = new Planet(15 + i % 2 * 65, 25 + Math.floor(i / 2) * 65, 50, 50);
      this.fakePlanets[i] = obj;
      this.objects.push(obj);
    }
  }

  getPotentialLocation() {
    let potX = Math.floor(Math.random() * this.width);
    let potY = Math.floor(Math.random() * this.height);
    if (this.determine[potX][potY] !== null && this.determine[potX][potY].planet) {
      return this.getPotentialLocation();
    }
    return [potX, potY]
  }

  addDirection(x, y, type, change) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
      return;
    }

    let determineObject = this.determine[x][y];
    if (determineObject === null) {
      this.determine[x][y] = {};
      determineObject = this.determine[x][y];
    }
    if (determineObject[type] === 'stop') {
      return;
    }
    determineObject[type] = change;
    if (type === 'planet') {
      determineObject.left = 'stop';
      determineObject.right = 'stop';
      determineObject.up = 'stop';
      determineObject.down = 'stop';
    }
  }

  fillDirections() {
    let p;

    for (p = 0; p < this.planets.length; p += 1) {
      const planet = this.planets[p];
      const location = this.getPotentialLocation();
      planet.x = location[0];
      planet.y = location[1];
      this.addDirection(planet.x, planet.y, 'planet', planet.type);

      console.info(planet.x, planet.y);

      this.addDirection(planet.x - 1, planet.y - 1, 'right', 'up');
      this.addDirection(planet.x - 1, planet.y - 1, 'down', 'left');
      this.addDirection(planet.x + 1, planet.y - 1, 'down', 'right');
      this.addDirection(planet.x + 1, planet.y - 1, 'left', 'up');
      this.addDirection(planet.x - 1, planet.y + 1, 'right', 'down');
      this.addDirection(planet.x - 1, planet.y + 1, 'up', 'left');
      this.addDirection(planet.x + 1, planet.y + 1, 'up', 'right');
      this.addDirection(planet.x + 1, planet.y + 1, 'left', 'down');
    }
  }

  determineDirection (x, y, direction, fake) {
    let directionTable = this.determine;
    if (fake) {
      directionTable = this.fakeDetermine;
    }

    const length = this.planetSquares.length;
    let square = null;
    let i;
    for (i = 0; i < length; i += 1) {
      square = this.planetSquares[i];
      if (square.inRange(x, y)) {
        break;
      }
    }

    const instruction = directionTable[square.idX][square.idY];

    if (instruction === null) {
      return direction
    }

    return instruction[direction] ? instruction[direction]: direction;
  }

  pressed(x, y) {
    let i;
    if (x > 160 && x < Engine.width - 160) {
      if (x > this.limitX1 && x < this.limitX2 && y > this.limitY1 && y < this.limitY2) {
        //Squares
        const length = this.planetSquares.length;
        for (i = 0; i < length; i += 1) {
          const square = this.planetSquares[i];
          if (square.inRange(x, y)) {
            if (square.fake) {
              square.setFake(null);
            }

            if (this.selectedPlanet) {
              square.setFake(this.selectedPlanet);
              this.selectedPlanet.setState('inactive');
              this.selectedPlanet = null;
            }
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
      if (x < 160) {
        const length = this.fakePlanets.length;
        for (i = 0; i < length; i += 1) {
          const square = this.fakePlanets[i];
          if (square.inRange(x, y)) {
            if (this.selectedPlanet !== null) {
              this.selectedPlanet.setState('inactive')
            }

            if (this.selectedPlanet === square) {
              this.selectedPlanet = null;
            } else {
              this.selectedPlanet = square;
              this.selectedPlanet.setState('active');
            }
            break;
          }
        }
      }
    }
  }

  released() {
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