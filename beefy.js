'use strict';

var beefy = require('beefy');
var browserify = require('browserify');
var http = require('http');

var handler = beefy({
  entries: ['index.js'],
  bundler: browserify
});

http.createServer(handler).listen(3000);