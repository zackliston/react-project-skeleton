var argparse = require('argparse');
var browserify = require('browserify');
var fs = require('fs');

var watchify = require('watchify');
require('envify');
require('uglifyify');

// setup arg parsing
var parser = new argparse.ArgumentParser({
  addHelp: true,
  description: 'browserify bundler ftw'
});

parser.addArgument(
  [ '-w', '--watch' ],
  {
    action: 'storeTrue',
    defaultValue: false,
    help: 'run bundler watch mode'
  }
);

parser.addArgument(
  [ '-m', '--map' ],
  {
    action: 'storeTrue',
    defaultValue: false,
    help: 'include source map within build'
  }
);

// thumbs up, let's do this...
var args = parser.parseArgs();
var _watch = args.watch;
console.log('[bundler] watch ?=', _watch);
var _map = args.map;
console.log('[bundler] map ?=', _map);

var _options = watchify.args;

if (_map) {
  _options.debug = true;
}

[
  { in: './app/index.js', out: './public/js/app.js' }
].forEach(function (path) {
  var b = browserify(_options);
  var bundler = b;

  function _build () {
    console.log('[bundler] ' + path.out + '; building...');
    bundler.bundle().on('error', _err).pipe(fs.createWriteStream(path.out));
  }

  function _err (err) {
    console.warn('[bundler] build error', err);

    if (_watch) {
      console.warn('[bundler] waiting for file change to retry');
      return;
    }

    process.exit(1);
  }

  if (_watch) {
    bundler = watchify(b);

    bundler.on('update', function () {
      console.log('[bundler] ' + path.out + '; update detected...');
      _build();
    });

    bundler.on('bytes', function (bytes) {
      var kb = Math.round(bytes / 1024);
      console.log('[bundler] ' + path.out + '; built, size = ' + kb + ' kb');
    });

    bundler.on('time', function (ms) {
      console.log('[bundler] ' + path.out + '; built, time = ' + ms + ' ms');
    });
  }

  bundler.add(path.in);

  b.transform('envify', {
    NODE_ENV: process.env.NODE_ENV
  });

  if (!_watch) {
    bundler.transform({
      global: true
    }, 'uglifyify');
  }

  _build();
});
