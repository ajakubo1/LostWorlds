import Engine from './core/Engine';
import { TYPES as ASSET_TYPES } from './core/Assets';
import SpaceScene from './space/SpaceScene';
import { createSquare } from './core/Placeholders';

const gameCanvas = document.getElementById('game');

Engine.setup(gameCanvas, 960, 540);

Engine._putAsset('planet', createSquare(50, 50, '#336600'), ASSET_TYPES.PLACEHOLDER);
Engine._putAsset('planetSquare', createSquare(50, 50, '#330066'), ASSET_TYPES.PLACEHOLDER);
Engine._putAsset('probeSquare', createSquare(50, 50, '#484848'), ASSET_TYPES.PLACEHOLDER);
Engine._putAsset('probe', createSquare(50, 50, '#00CC99'), ASSET_TYPES.PLACEHOLDER);
Engine._putAsset('energy', createSquare(100, 350, '#CCFF00'), ASSET_TYPES.PLACEHOLDER);
Engine._putAsset('laserH', createSquare(50, 10, '#E80000'), ASSET_TYPES.PLACEHOLDER);
Engine._putAsset('laserV', createSquare(10, 50, '#E80000'), ASSET_TYPES.PLACEHOLDER);

const config = {
  width: 5,
  height: 5,
  planets: [
    {
      type: "planet"
    },
    {
      type: "planet"
    },
    {
      type: "planet"
    }
  ]
};

Engine.setScene(new SpaceScene(config));
Engine.startScene();
