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