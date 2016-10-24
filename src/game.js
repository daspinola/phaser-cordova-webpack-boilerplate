import 'pixi';
import 'p2';
import Phaser from 'phaser';
import globals from './globals';
import PreloadState from './states/preload';
import BootState from './states/boot';
import ScreenUtils from './libs/ScreenUtils';

class Game extends Phaser.Game {

  constructor() {

    const screenMetrics = ScreenUtils.calculateScreenMetrics(globals.screen.width, globals.screen.height);

    super(screenMetrics.gameWidth, screenMetrics.gameHeight, Phaser.AUTO, '', null);

    // state declarations
    this.state.add('preload', PreloadState, false);
    this.state.add('boot', BootState, false);

    this.state.start('preload');
  }
}

window.game = new Game();
