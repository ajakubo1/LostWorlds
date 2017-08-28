import Scene from '../core/Scene';
import Engine from '../core/Engine';
import PlanetSquare from './objects/PlanetSquare';
import ProbeSquare from './objects/ProbeSquare';
import Background from './objects/Background';
import Panel from './objects/Panel';
import Beam from "./objects/Beam";
import Planet from "./objects/Planet";
import Energy from "./objects/Energy";
import Button from '../core/Button';
import LevelScene from "../level/LevelScene";

export default class SpaceScene extends Scene {

  constructor(config) {
    super();

    this.check = this.check.bind(this);
    this.backToLevel = this.backToLevel.bind(this);
    this.checkSolution = this.checkSolution.bind(this);
    this.checkLimit = 3;

    this.clickedSquare = null;
    this.selectedPlanet = null;
    this.beam = null;
    this.fake = null;
    this.energyIndicator = new Energy(Engine.width - 125, 25, 100, 350);
    this.checkButton = new Button(
      Engine.width - 130, Engine.height - 65, 120, 40,
      'Is that it?', undefined, undefined, this.check
    );
    this.backButton = new Button(
      Engine.width - 130, Engine.height - 115, 120, 40,
      '<- Back', undefined, undefined, this.backToLevel
    );
    this.solutionButton = new Button(
      Engine.width - 130, Engine.height - 165, 120, 40,
      'Check solution', undefined, undefined, this.checkSolution
    );

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
    this.energyIndicator.setEnergy(1000 * this.planets.length);

    this.objects.push(new Background(0, 0, Engine.width, Engine.height));
    this.objects.push(new Panel(10, 10, 130, Engine.height - 20));
    this.objects.push(new Panel(Engine.width - 140, 10, 130, Engine.height - 20));

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
      const obj = new Planet(25 + i % 2 * 50, 25 + Math.floor(i / 2) * 65, 50, 50);
      this.fakePlanets[i] = obj;
      this.objects.push(obj);
    }

    this.objects.push(this.energyIndicator);
    this.objects.push(this.checkButton);
    this.objects.push(this.backButton);
    this.objects.push(this.solutionButton);
  }

  getPotentialLocation() {
    let potX = Math.floor(Math.random() * this.width);
    let potY = Math.floor(Math.random() * this.height);
    if (this.determine[potX][potY] !== null && this.determine[potX][potY].planet) {
      return this.getPotentialLocation();
    }
    return [potX, potY]
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

  addDirection(x, y, type, change, fake = false) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
      return;
    }

    let determineTable = this.determine;

    if (fake) {
      determineTable = this.fakeDetermine
    }

    let determineObject = determineTable[x][y];
    if (determineObject === null) {
      determineTable[x][y] = {};
      determineObject = determineTable[x][y];
    }
    if (determineObject[type] === 'stop') {
      return;
    }

    if (determineObject[type]) {
      if (determineObject[type] === this.opositeDirection(type)) {
        return;
      } else if (determineObject[type] === this.opositeDirection(change)){
        determineObject[type] = this.opositeDirection(type)
      } else {
        determineObject[type] = change;
      }
    } else {
      determineObject[type] = change;
    }

    if (type === 'planet') {
      determineObject.left = 'stop';
      determineObject.right = 'stop';
      determineObject.up = 'stop';
      determineObject.down = 'stop';
    }
  }

  addPlanet(x, y, type, fake = false) {
    this.addDirection(x, y, 'planet', type, fake);
    this.addDirection(x - 1, y - 1, 'right', 'up', fake);
    this.addDirection(x - 1, y - 1, 'down', 'left', fake);
    this.addDirection(x + 1, y - 1, 'down', 'right', fake);
    this.addDirection(x + 1, y - 1, 'left', 'up', fake);
    this.addDirection(x - 1, y + 1, 'right', 'down', fake);
    this.addDirection(x - 1, y + 1, 'up', 'left', fake);
    this.addDirection(x + 1, y + 1, 'up', 'right', fake);
    this.addDirection(x + 1, y + 1, 'left', 'down', fake);

    if (x === 0) {
      this.addDirection(x, y - 1, 'right', 'left', fake);
      this.addDirection(x, y + 1, 'right', 'left', fake);
    } else if (x === this.width -1) {
      this.addDirection(x, y - 1, 'left', 'right', fake);
      this.addDirection(x, y + 1, 'left', 'right', fake);
    }

    if (y === 0) {
      this.addDirection(x + 1, y, 'down', 'up', fake);
      this.addDirection(x - 1, y, 'down', 'up', fake);
    } else if (y === this.height -1) {
      this.addDirection(x + 1, y, 'up', 'down', fake);
      this.addDirection(x - 1, y, 'up', 'down', fake);
    }
  }

  fillDirections() {
    let p;

    for (p = 0; p < this.planets.length; p += 1) {
      const planet = this.planets[p];
      if (planet.x === undefined) {
        const location = this.getPotentialLocation();
        planet.x = location[0];
        planet.y = location[1];
      }
      console.info(planet.x, planet.y);

      this.addPlanet(planet.x, planet.y, planet.type);
    }
  }

  zeroFakeDetermine() {
    var i,j;

    for (i = 0 ; i < this.width; i += 1) {
      for (j = 0 ; j < this.height; j += 1) {
        this.fakeDetermine[i][j] = null;
      }
    }
  }

  planetPlaced() {
    this.zeroFakeDetermine();

    let p;

    for (p = 0; p < this.fakePlanets.length; p += 1) {
      const planet = this.fakePlanets[p];
      if (planet.square) {
        this.addPlanet(planet.square.idX, planet.square.idY, this.planets[p].type, true);
      }
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
            let recount = false;
            if (square.fake) {
              square.setFake(null);
              recount = true;
            }

            if (this.selectedPlanet) {
              square.setFake(this.selectedPlanet);
              this.selectedPlanet.setState('inactive');
              this.selectedPlanet = null;
              recount = true;
            }

            if (recount) {
              this.planetPlaced();
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
            this.clickedSquare = square;
            this.clickedSquare.setState('active');
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
      } else {
        if (this.checkButton.state === 1 && this.checkButton.inRange(x, y)) {
          this.checkButton.click();
        }

        if (this.backButton.state === 1 && this.backButton.inRange(x, y)) {
          this.backButton.click();
        }

        if (this.solutionButton.state === 1 && this.solutionButton.inRange(x, y)) {
          this.solutionButton.click();
        }
      }
    }
  }

  released() {
    if (this.clickedSquare !== null) {
      this.clickedSquare.setState('inactive');
      this.clickedSquare = null;
    }
    if (this.beam !== null) {
      this.beam = null;
      this.fake = null;
    }
  }

  moved(x, y) {
    if (this.clickedSquare !== null && !this.clickedSquare.inRange(x, y)) {
      this.clickedSquare.setState('inactive');
      this.clickedSquare = null;

      if (this.beam !== null) {
        this.beam = null;
        this.fake = null;
      }
    } else {
      if (this.checkButton.state === 0 && this.checkButton.inRange(x, y)) {
        this.checkButton.setHover();
      }

      if (this.checkButton.state === 1 && !this.checkButton.inRange(x, y)) {
        this.checkButton.setNormal();
      }

      if (this.backButton.state === 0 && this.backButton.inRange(x, y)) {
        this.backButton.setHover();
      }

      if (this.backButton.state === 1 && !this.backButton.inRange(x, y)) {
        this.backButton.setNormal();
      }

      if (this.solutionButton.state === 0 && this.solutionButton.inRange(x, y)) {
        this.solutionButton.setHover();
      }

      if (this.solutionButton.state === 1 && !this.solutionButton.inRange(x, y)) {
        this.solutionButton.setNormal();
      }
    }
  }

  update() {
    if (this.beam !== null) {
      this.beam.update();
      this.fake.update();
      this.energyIndicator.update();

      if (this.energyIndicator.energy === 0) {
        this.released();
      }
    }
  }

  check() {
    var i, j;
    for (i = 0; i < this.width; i += 1) {
      for (j = 0 ; j < this.height; j += 1) {
        const real = this.determine[i][j];
        const fake = this.fakeDetermine[i][j];

        if (real !== null && real.planet) {
          if (fake !== null && fake.planet) {
            if (real.planet.type !== fake.planet.type) {
              console.info('nope!');
              return;
            }
          } else {
            console.info('nope!');
            return;
          }
        }
      }
    }

    this.levelWon();
  }

  levelWon() {
    let i;
    for (i = 0 ; i < Engine.globals.levels.length ; i += 1) {
      const level = Engine.globals.levels[i];
      if (!level.open) {
        level.open = true;
        break;
      }
    }
    this.backToLevel();
  }

  checkSolution() {
    this.fakeDetermine = this.determine;

    let i, j;

    const length = this.planetSquares.length;
    for (i = 0; i < length; i += 1) {
      const square = this.planetSquares[i];
      square.setFake(null);
    }

    for (i = 0 ; i < this.planets.length; i += 1) {
      let square;
      for (j = 0; j < length; j += 1) {
        square = this.planetSquares[j];
        if (square.idX === this.planets[i].x && square.idY === this.planets[i].y) {
          break;
        }
      }

      square.setFake(this.fakePlanets[i]);
    }

    this.planetPlaced();
  }

  backToLevel() {
    Engine.removeScene();
    Engine.setScene(new LevelScene());
    Engine.startScene();
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