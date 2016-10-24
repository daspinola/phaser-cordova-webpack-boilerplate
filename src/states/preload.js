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
   
  }

  create() {
     this.game.state.start('boot');
  }
}
