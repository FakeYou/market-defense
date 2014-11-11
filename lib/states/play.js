'use strict';

var Market = require('../market.js');

var Play = function(game) {
  this.game = game;

  this.mob = null;
};

Play.prototype.preload = function() {
};  

Play.prototype.create = function() {
  this.market = new Market(this.game);
  this.market.create();
};

Play.prototype.update = function() {
  this.market.update();
};

module.exports = Play;