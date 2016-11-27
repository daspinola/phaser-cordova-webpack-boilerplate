export default class Star extends Phaser.Sprite {
  
  /**
   * Represents the Star sprite.
   * 
   * @param {Integer} x - the x coordinate of the sprite
   * @param {Integer} y - the y coordinate of the sprite
   */
  constructor(x, y) {
    super(game, x, y, 'star');

    this.anchor.set(0.5);
    this.scale.set(0.8);

    game.physics.arcade.enable(this);
    this.body.velocity.x = -200;
    this.body.setSize(32, 32, 14, 16);

    this.checkWorldBounds = true;
    this.outOfBoundKill = true;
    
    game.world.add(this);

    // Animate the star's scale continously
    game.add.tween(this.scale)
      .to({ x:1.1, y:1.1 }, 400, Phaser.Easing.Linear.None, true, 0, -1)
      .yoyo(true, 400);
  }

}
