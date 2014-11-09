'use strict';

var Mob = require('../entities/mob.js');
var Market = require('../market.js');

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

  new Mob(this.game).preload();
  new Market(this.game).preload();
};

Preload.prototype.create = function() {
  this.progressBar.cropEnabled = false;
};

Preload.prototype.update = function() {
  if(this.load.hasLoaded) {
    this.state.start('play');
  }
};

module.exports = Preload;