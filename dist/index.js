(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var MarketDefense = {
  Boot: require('./lib/states/boot'),
  Preload: require('./lib/states/preload'),
};

window.addEventListener('load', function() {
  console.log('load');
  var game = new Phaser.Game(400, 400, Phaser.AUTO, 'container');

  game.state.add('boot', MarketDefense.Boot);
  game.state.add('preload', MarketDefense.Preload);

  game.state.start('boot');
});
},{"./lib/states/boot":2,"./lib/states/preload":3}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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
},{}]},{},[1])