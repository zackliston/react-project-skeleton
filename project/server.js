'use strict';

var cluster = require('cluster');
var os = require('os');

// [KE] no need to cluster during local dev
var numCPUs = os.cpus().length;
if (process.env.NODE_ENV !== 'production') {
  numCPUs = 1;
}

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', cluster.fork);
} else {
  require('./index');
}
