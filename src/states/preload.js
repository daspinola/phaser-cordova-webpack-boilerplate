import Phaser from 'phaser';
import globals from '../globals';
import ScreenUtils from '../libs/ScreenUtils';

export default class extends Phaser.State {

  init() {
    const screenMetrics = ScreenUtils.calculateScreenMetrics(globals.screen.width, globals.screen.height);

    this.input.maxPointers = 1;
    this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.scale.setUserScale(screenMetrics.scaleX, screenMetrics.scaleY);
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  }

  preload() {
    // Assets should be loaded here
    this.load.image('app_icon', 'assets/icon.png');
  }

  create() {
    this.game.state.start('boot');
  }
}
