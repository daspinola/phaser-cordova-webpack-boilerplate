/**
 * This is the boot state, under normal circumstances the core game logic resides here.
 * For now we have a flappy bird clone with a twist for you to fiddle with.
 * 
 * If you want to start a game from scratch, simply empty out the init(), 
 * create() and update() functions and the prefab imports they use.
 */

import Phaser from 'phaser';
import Player from '../prefabs/player';
import Star from '../prefabs/star';
import WallChunk from '../prefabs/wallchunk';

export default class extends Phaser.State {

  /**
   * Change/define stuff that doesn't rely on the assets being preloaded.
   */
  init() {
    this.score = 0;
    this.wallGroup = game.add.group();
    this.starGroup = game.add.group();
    this.createUIText();

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#71c5cf';
  }


  /**
   * Spawn the player and setup the controls
   */
  create() {
    this.player = new Player(game.world.centerX, game.world.centerY);

    // initially clicking or tapping the screen will start the game
    game.input.onDown.add(this.startGame, this);
  }


  /**
   * Check for out-of-bounds player, handle game object collisions or animations.
   */
  update() {
    // The player cannot exit the defined world bounds
    if (this.player.y < 0 || this.player.y > game.world.height){
      this.restartGame();
    }

    // Handles collisions between the player and walls/stars
    game.physics.arcade.overlap(this.player, this.wallGroup, this.onWallHit, null, this);
    game.physics.arcade.overlap(this.player, this.starGroup, this.onStarHit, null, this);

    this.player.animate();
  }


  /**
   * Starts the game loop
   */
  startGame(){
    // switch the click/tap handler to make the player jump.
    game.input.onDown.removeAll();
    game.input.onDown.add(this.player.jump, this.player); 

    this.player.playerPulseAnim.stop();
    this.player.jump();

    // Start spawning the walls
    this.timer = game.time.events.loop(1500, this.addWall, this);
    
    this.helpText.destroy();
  }


  /**
   * Creates the UI text
   */
  createUIText(){
    const textMessage = 'Click or Tap to Jump';
    const textStyle = {
      font: '30px Arial', 
      fill: '#ffffff', 
      boundsAlignH: "center", 
      boundsAlignV: "bottom"
    }

    this.helpText = game.add.text(20, -50, textMessage, textStyle);
    this.helpText.setTextBounds(0, 0, game.world.width, game.world.height);

    this.labelScore = game.add.text(game.world.centerX, 40, '0', { font: '30px Arial', fill: '#ffffff' });
    this.labelScore.anchor.set(0.5);
  }


  /**
   * Handler for the collision between the player and a wall object.
   * This essencially stops the walls from animating and stops
   * the game loop.
   */
  onWallHit(){
    if (!this.player.alive) return;

    this.player.alive = false;

    this.wallGroup.forEach(function(p){
        p.body.velocity.x = 0;
    });

    this.starGroup.forEach(function(p){
        p.body.velocity.x = 0;
    });

    game.time.events.remove(this.timer);
  }


  /**
   * Handler for the collision bettwen the player and a star object.
   */
  onStarHit(player, star){
    star.kill();
    this.updateScore();
    return;
  }


  /**
   * Looks at the world height and calculates how many chunks it will take to
   * build a column top to bottom. Two chunks are removed randomly to allow
   * the player to fly throught the column.
   */
  addWall(){
    const chunkSize = 64;
    const wallSize = Math.ceil(game.world.height / chunkSize);
    const hole = game.rnd.integerInRange(2, wallSize-1);
    
    for(let i = 0; i < wallSize; i++){ 
      if( i !== hole && i !== hole + 1){
        const wallChunk = new WallChunk(game.world.width, i * 60);
        this.wallGroup.add(wallChunk);
      } else {
        const rndX = game.rnd.integerInRange(130, 190);
        const rndY = game.rnd.integerInRange(55, 75);
        const star = new Star(game.world.width + rndX , i * rndY);
        this.starGroup.add(star);
      }
    }
  }


  /**
   * Updates the score and it's label
   */
  updateScore(){
    this.score += 1;
    this.labelScore.text = this.score;
  }


  /**
   * Triggers a state restart.
   */
  restartGame() {
    game.state.start('boot');
  }
}
