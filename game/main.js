import Engine from './core/Engine';
import { TYPES as ASSET_TYPES, IDENTIFIERS as ASSET_IDENTIFIERS } from './core/Assets';
import SpaceScene from './space/SpaceScene';
import { TYPES as PLANET_TYPES } from './space/objects/Planet';

import LevelScene from './level/LevelScene';
import { createSquare } from './core/Placeholders';

const gameCanvas = document.getElementById('game');

Engine.setup(gameCanvas, 960, 540);

Engine._putAsset(
  ASSET_IDENTIFIERS.PLANET,
  createSquare(50, 50, '#336600'),
  ASSET_TYPES.PLACEHOLDER
);
Engine._putAsset(
  ASSET_IDENTIFIERS.PLANET_SQUARE,
  createSquare(50, 50, '#330066'),
  ASSET_TYPES.PLACEHOLDER
);
Engine._putAsset(
  ASSET_IDENTIFIERS.PLANET_SQUARE_ACTIVE,
  createSquare(50, 50, '#660066'),
  ASSET_TYPES.PLACEHOLDER
);
Engine._putAsset(
  ASSET_IDENTIFIERS.PROBE_SQUARE,
  createSquare(50, 50, '#484848'),
  ASSET_TYPES.PLACEHOLDER
);
Engine._putAsset(
  ASSET_IDENTIFIERS.PROBE_SQUARE_ACTIVE,
  createSquare(50, 50, '#6A4848'),
  ASSET_TYPES.PLACEHOLDER
);
Engine._putAsset(
  ASSET_IDENTIFIERS.PROBE,
  createSquare(50, 50, '#00CC99'),
  ASSET_TYPES.PLACEHOLDER
);
Engine._putAsset(
  ASSET_IDENTIFIERS.ENERGY,
  createSquare(100, 350, '#DD55AA'),
  ASSET_TYPES.PLACEHOLDER
);
Engine._putAsset(
  ASSET_IDENTIFIERS.LASER,
  createSquare(10, 10, '#E80000'),
  ASSET_TYPES.PLACEHOLDER
);
Engine._putAsset(
  ASSET_IDENTIFIERS.LASER_FAKE,
  createSquare(10, 10, '#EE6222'),
  ASSET_TYPES.PLACEHOLDER
);
Engine._putAsset(
  ASSET_IDENTIFIERS.BACKGROUND,
  createSquare(960, 540, '#002201'),
  ASSET_TYPES.PLACEHOLDER
);
Engine._putAsset(
  ASSET_IDENTIFIERS.PANEL,
  createSquare(150, 540, '#AACC22', '#E80088'),
  ASSET_TYPES.PLACEHOLDER
);

Engine._putAsset(
  ASSET_IDENTIFIERS.LEVEL_SQUARE,
  createSquare(100, 100, '#660066'),
  ASSET_TYPES.PLACEHOLDER
);

Engine._putAsset(
  ASSET_IDENTIFIERS.LEVEL_SQUARE_ACTIVE,
  createSquare(100, 100, '#660066'),
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
          type: PLANET_TYPES.NORMAL,
          x: 0,
          y: 1
        }
      ],
      open: true,
      isTutorial: true
    }, {
      name: 'Easy start',
      width: 4,
      height: 4,
      planets: [
        {
          type: PLANET_TYPES.NORMAL,
        }, {
          type: PLANET_TYPES.NORMAL,
        }
      ],
      open: false
    }, {
      name: 'Serious stuff',
      width: 6,
      height: 6,
      planets: [
        {
          type: PLANET_TYPES.NORMAL,
        }, {
          type: PLANET_TYPES.NORMAL,
        }, {
          type: PLANET_TYPES.NORMAL,
        }, {
          type: PLANET_TYPES.NORMAL,
        }
      ],
      open: false
    }
  ],
  tutorialEnabled: true
};


Engine.setScene(new LevelScene());
Engine.startScene();