import Engine from './core/Engine';
import SpaceScene from './space/SpaceScene';

Engine.setup('game', 640, 480);

Engine.setScene(new SpaceScene());
Engine.startScene();
