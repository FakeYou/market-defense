'use strict';

var _ = require('underscore');
var EasyStar = require('easystarjs');
var Mob = require('./entities/mob');

var Market = function(game) {
  this.game = game;
};

Market.BUILDINGS = {
  ENTRANCE: 1,
  EXIT: 2
};

Market.prototype.preload = function() {
  this.game.load.spritesheet('tileset', 'assets/tileset.png', 32, 32);
  this.game.load.tilemap('dev', 'assets/levels/dev-level.json', null, Phaser.Tilemap.TILED_JSON);
};

Market.prototype.create = function() {
  this.dirty = true;

  this.map = this.game.add.tilemap('dev');
  this.map.addTilesetImage('tileset');

  this.background = this.map.createLayer('background');
  this.background.resizeWorld();

  this.easystar = new EasyStar.js();
  this.easystar.setAcceptableTiles([1]);
  this.easystar.setGrid(_.map(this.background.layer.data, function(row) { return _.pluck(row, 'index'); }));

  this.entrance = _.findWhere(this.map.objects.triggers, { name: 'entrance' });
  this.exit = _.findWhere(this.map.objects.triggers, { name: 'exit' });

  this.mobs = [
    new Mob(this.game, this)
  ];

  _.invoke(this.mobs, 'create');

  var self = this;
  setTimeout(function() {
    self.map.putTile(1, 4, 8, 'background');
    self.map.putTile(21, 2, 3, 'background');
    self.dirty = true;
  }, 5000);
};

Market.prototype.findPath = function(mob) {
  console.log(this.background);
  var start = this.background.getTileXY(mob.sprite.x, mob.sprite.y, new Phaser.Point());
  var end = this.background.getTileXY(this.exit.x, this.exit.y, new Phaser.Point());

  this.easystar.findPath(start.x, start.y - 1, end.x, end.y - 1, function(path) {
    path = _.map(path, function(node) {
      node.x = node.x * 32 + 13;
      node.y = node.y * 32 + 13;
      return node;
    });

    console.log(path);
    mob.path = path;
  });
};

Market.prototype.update = function() {
  this.easystar.calculate();

  for(var i = 0; i < this.mobs.length; i++) {
    var mob = this.mobs[i];

    if(this.dirty) {
      this.findPath(mob);
    }

    mob.update();
  }
  
  this.dirty = false;
};

module.exports = Market;