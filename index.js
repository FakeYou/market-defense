'use strict';

window._ = require('underscore');

var MarketDefense = {
  Boot: require('./lib/states/boot'),
  Preload: require('./lib/states/preload'),
  Play: require('./lib/states/play')
};

window.addEventListener('load', function() {
  var game = new Phaser.Game(400, 400, Phaser.AUTO, 'container');

  game.state.add('boot', MarketDefense.Boot);
  game.state.add('preload', MarketDefense.Preload);
  game.state.add('play', MarketDefense.Play);

  game.state.start('boot');
});