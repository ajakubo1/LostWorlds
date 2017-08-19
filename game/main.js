import Engine from './core/Engine';
import Scene from './space/Scene';

const engine = new Engine('game', 1000, 1000);

engine.setScene(new Scene());
engine.startScene();
