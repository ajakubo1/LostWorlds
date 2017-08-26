import Engine from './core/Engine';
import { TYPES as ASSET_TYPES, IDENTIFIERS as ASSET_IDENTIFIERS } from './core/Assets';
import SpaceScene from './space/SpaceScene';
import { TYPES as PLANET_TYPES } from './space/objects/Planet';
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
  createSquare(100, 350, '#CCFF00'),
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

const config = {
  width: 6,
  height: 5,
  planets: [
    {
      type: PLANET_TYPES.NORMAL
    },
  ]
};

Engine.setScene(new SpaceScene(config));
Engine.startScene();
