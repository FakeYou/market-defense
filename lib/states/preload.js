'use strict';

var Preload = function(game) {
  this.game = game;

  this.background = null;
  this.progressBar = null;

  this.ready = false;
};

Preload.prototype.preload = function() {
  this.background = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadBackground');
  this.background.anchor.setTo(0.5, 0.5);
  this.background.scale.set(1, 1);

  this.progressBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadProgressBar');
  this.progressBar.anchor.setTo(0.5, 0.5);
  this.progressBar.scale.set(1, 1);
  this.progressBar.x = this.world.centerX;

  this.load.setPreloadSprite(this.progressBar);

  // load assets
  this.load.image('title', 'assets/title.jpg');
};

Preload.prototype.create = function() {
  this.progressBar.cropEnabled = false;
};

Preload.prototype.update = function() {
  // console.log(this.load);
};

module.exports = Preload;