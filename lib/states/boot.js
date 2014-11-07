'use strict';

var Boot = function(game) {
  this.game = game;
};

Boot.prototype.preload = function() {
  this.load.image('preloadBackground', 'assets/preloadBackground.gif');
  this.load.image('preloadProgressBar', 'assets/preloadProgressBar.gif');
};

Boot.prototype.create = function() {
  this.state.start('preload');
};

module.exports = Boot;