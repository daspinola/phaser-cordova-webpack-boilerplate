export default class WallChunk extends Phaser.Sprite {

  /**
   * Represents the WallChunk sprite.
   * 
   * @param {Integer} x - the x coordinate of the sprite
   * @param {Integer} y - the y coordinate of the sprite
   */
  constructor(x, y) {
    super(game, x, y, 'wallchunk');
    
    game.physics.arcade.enable(this);
    this.body.velocity.x = -200;

    // Kills the wall sprite when out-of-bounds
    this.checkWorldBounds = true;
    this.outOfBoundKill = true;
  }

}
