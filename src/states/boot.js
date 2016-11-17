import Phaser from 'phaser';

export default class extends Phaser.State {

  // Refer to phaser documentation for available methods like render and update

  init() {
    const appIcon = game.add.sprite(game.world.centerX, game.world.centerY, 'app_icon');
    appIcon.anchor.set(0.5);
  }

  create() {
   
  }

  update() {
   
  }

  render() {
    
  }
}
