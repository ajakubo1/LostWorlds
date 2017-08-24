import Engine from './core/Engine';
import SpaceScene from './space/SpaceScene';

const gameCanvas = document.getElementById('game');

Engine.setup(gameCanvas, 960, 540);

Engine.loadAsset()

Engine.setScene(new SpaceScene());
Engine.startScene();
