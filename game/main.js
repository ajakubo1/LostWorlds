import Engine from './core/Engine';
import { TYPES as ASSET_TYPES, IDENTIFIERS as ASSET_IDENTIFIERS } from './core/Assets';
import { TYPES as PLANET_TYPES } from './space/objects/Planet';
import {createOpaqCircle, createOpaqSquare, createSquare} from './core/Placeholders';
import MenuScene from "./menu/MenuScene";

const gameCanvas = document.getElementById('game');

Engine.setup(gameCanvas, 960, 540);

Engine._putAsset(
  ASSET_IDENTIFIERS.RED,
  createOpaqCircle(50, 50, 15, '#A10000', '#A10000', 2, 0.3),
  ASSET_TYPES.PLACEHOLDER
);
Engine._putAsset(
  ASSET_IDENTIFIERS.BLUE,
  createOpaqCircle(50, 50, 15, '#003399', '#003399', 2, 0.3),
  ASSET_TYPES.PLACEHOLDER
);
Engine._putAsset(
  ASSET_IDENTIFIERS.GREEN,
  createOpaqCircle(50, 50, 15, '#00A100', '#00A100', 2, 0.3),
  ASSET_TYPES.PLACEHOLDER
);
Engine._putAsset(
  ASSET_IDENTIFIERS.SINGULARITY,
  createOpaqCircle(50, 50, 10, '#000000', '#ffffff', 1, 0.6),
  ASSET_TYPES.PLACEHOLDER
);
Engine._putAsset(
  ASSET_IDENTIFIERS.CAT,
  createOpaqCircle(50, 50, 15, '#aa4400', '#aa4400', 1, 0.6),
  ASSET_TYPES.PLACEHOLDER
);
Engine._putAsset(
  ASSET_IDENTIFIERS.PLANET_SQUARE,
  createOpaqSquare(50, 50, '#330066', '#330066', 2, 0.3),
  ASSET_TYPES.PLACEHOLDER
);
Engine._putAsset(
  ASSET_IDENTIFIERS.PLANET_SQUARE_ACTIVE,
  createSquare(50, 50, '#660066'),
  ASSET_TYPES.PLACEHOLDER
);
Engine._putAsset(
  ASSET_IDENTIFIERS.PROBE_SQUARE,
  createOpaqSquare(50, 50, '#00CC99', '#00CC99', 2, 0.3),
  ASSET_TYPES.PLACEHOLDER
);
Engine._putAsset(
  ASSET_IDENTIFIERS.PROBE_SQUARE_ACTIVE,
  createOpaqSquare(50, 50, '#E80000', '#E80000', 2, 0.3),
  ASSET_TYPES.PLACEHOLDER
);
Engine._putAsset(
  ASSET_IDENTIFIERS.ENERGY,
  createSquare(100, 350, '#DD55AA'),
  ASSET_TYPES.PLACEHOLDER
);
Engine._putAsset(
  ASSET_IDENTIFIERS.BACKGROUND,
  createSquare(960, 540, '#111111'),
  ASSET_TYPES.PLACEHOLDER
);
Engine._putAsset(
  ASSET_IDENTIFIERS.PANEL,
  createOpaqSquare(130, 520, '#6600ff', '#6600ff', 2, 0.4),
  ASSET_TYPES.PLACEHOLDER
);

Engine._putAsset(
  ASSET_IDENTIFIERS.LEVEL_SQUARE,
  createSquare(100, 100, '#660066'),
  ASSET_TYPES.PLACEHOLDER
);

Engine._putAsset(
  ASSET_IDENTIFIERS.LEVEL_SQUARE_ACTIVE,
  createSquare(100, 100, '#6600ff'),
  ASSET_TYPES.PLACEHOLDER
);

Engine.globals = {
  levels: [
    {
      name: 'Tutorial',
      width: 3,
      height: 3,
      planets: [
        {
          type: PLANET_TYPES.RED,
          x: 0,
          y: 1,
        }
      ],
      open: true,
      isTutorial: true,
      energyNotAffected: true
    }, {
      name: 'Easy start',
      width: 4,
      height: 4,
      planets: [
        {
          type: PLANET_TYPES.RED,
        }, {
          type: PLANET_TYPES.RED,
        }
      ],
      open: false
    }, {
      name: 'Feeling blue',
      width: 3,
      height: 3,
      planets: [
        {
          type: PLANET_TYPES.RED,
          x: 0,
          y: 1,
        }, {
          type: PLANET_TYPES.BLUE,
          x: 1,
          y: 1,
        }
      ],
      open: false,
      newPlanets: true,
      energyNotAffected: true
    }, {
      name: 'Serious stuff',
      width: 6,
      height: 6,
      planets: [
        {
          type: PLANET_TYPES.RED,
        }, {
          type: PLANET_TYPES.RED,
        }, {
          type: PLANET_TYPES.GREEN,
        }, {
          type: PLANET_TYPES.BLUE,
        }
      ],
      open: false,
    }, {
      name: 'The Singularity',
      width: 4,
      height: 4,
      planets: [
        {
          type: PLANET_TYPES.SINGULARITY,
        }
      ],
      open: false,
      newSingularity: true,
      energyNotAffected: true,
    }, {
      name: 'What a mess',
      width: 6,
      height: 6,
      planets: [
        {
          type: PLANET_TYPES.RED,
        }, {
          type: PLANET_TYPES.GREEN,
        }, {
          type: PLANET_TYPES.BLUE,
        }, {
          type: PLANET_TYPES.SINGULARITY,
        }
      ],
      open: false,
    }, {
      name: 'Schrodinger',
      width: 4,
      height: 4,
      planets: [
        {
          type: PLANET_TYPES.CAT,
          x: 0,
          y: 1
        },{
          type: PLANET_TYPES.GREEN,
          x: 2,
          y: 2
        },
      ],
      open: false,
      newCat: true,
      energyNotAffected: true
    }
  ],
  tutorialEnabled: true
};


Engine.setScene(new MenuScene());
Engine.startScene();