export default class Player extends Phaser.Sprite {
  
  /**
   * Represents the Player sprite and it's actions
   * 
   * @param {Integer} x - the x coordinate of the sprite
   * @param {Integer} y - the y coordinate of the sprite
   */
  constructor(x, y) {
    super(game, x, y, 'player');
    
    this.alive = true;
    this.scale.set(1.2);
    this.anchor.setTo(-0.2, 0.5);

    game.physics.arcade.enable(this);

    // Initial player animation
    this.playerPulseAnim = game.add.tween(this.scale)
      .to({ x:1.4, y:1.4}, 400, 'Linear', true, 0, -1)
      .yoyo(true, 400);
    
    game.world.add(this);
  }

  /**
   * The jump action
   */
  jump(){
    if (this.alive === false) return;

    this.body.gravity.y = 1000;
    this.body.velocity.y = -350;
    
    game.add.tween(this).to({angle: 0}, 100).start();
  }

  /**
   * Animates the player angle
   */
  animate(){
    if (this.angle < 20){
      this.angle += 1;
    }
  }

}
