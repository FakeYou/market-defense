'use strict';

var Mob = function(game, market) {
  this.game = game;
  this.market = market;

  this.sprite = null;
  this.path = null;
};

Mob.prototype.preload = function() {
  this.game.load.spritesheet('dude', 'assets/dude.png', 32, 32);
};

Mob.prototype.create = function() {
  this.sprite = this.game.add.sprite(16, 176, 'dude');
  this.sprite.anchor.set(0.5, 0.5);
  this.game.physics.arcade.enable(this.sprite);
  // this.sprite.body.collideWorldBounds = true;

  this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
  this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);

  // this.target = Market.BUILDINGS.EXIT;
};

Mob.prototype.update = function() {
  if(this.path && this.path.length) {
    var dx = this.path[0].x - this.sprite.x;
    var dy = this.path[0].y - this.sprite.y;

    var dist = Math.sqrt(dx * dx + dy * dy);

    if(dist > 0.5) {
      this.sprite.body.velocity.x = dx / dist * 100;
      this.sprite.body.velocity.y = dy / dist * 100;
    }
    else {
      this.path.shift();
    }
  }
  else {
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
  }
};

module.exports = Mob;