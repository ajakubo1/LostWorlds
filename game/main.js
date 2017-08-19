import Engine from './core/Engine';
import SpaceScene from './space/SpaceScene';

const engine = new Engine('game', 1000, 1000);

engine.setScene(new SpaceScene());
engine.startScene();
