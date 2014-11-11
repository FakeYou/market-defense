'use strict';

var _ = require('underscore');

var Mob = function(game, market) {
  this.game = game;
  this.market = market;

  this.sprite = null;
  this.line = null;
  this.path = null;
  this.tween = null;
};

Mob.prototype.preload = function() {
  this.game.load.spritesheet('dude', 'assets/dude.png', 32, 32);
};

Mob.prototype.create = function() {
  this.sprite = this.game.add.sprite(16, 176, 'dude');
  this.sprite.anchor.set(0.5, 0.5);
  this.game.physics.arcade.enable(this.sprite);

  this.line = this.game.add.graphics(0, 0);
  this.tween = this.game.add.tween(this.sprite);

  // this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
  // this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
};

Mob.prototype.update = function() {
  if(this.path && !this.tween.isRunning) {
    this.tween = this.game.add.tween(this.sprite);
    this.tween.to(this.path.shift(), 500, Phaser.Easing.Linear.None);
    this.tween.start();
  }
};

Mob.prototype.setPath = function(path) {
  var self = this;

  this.path = path;

  this.line.clear();
  this.line.lineStyle(2, 0x0000FF, 1);

  this.line.moveTo(path[0].x, path[0].y);
  _.each(path, function(node) {
    self.line.lineTo(node.x, node.y);
  });
};

module.exports = Mob;