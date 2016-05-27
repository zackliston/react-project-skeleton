const cwd = __dirname;

const assets = require('connect-assets');
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const path = require('path');

const relquire = require('relquire');
const routes = [
  relquire('~/routes/app')
];

const app = express();
const buildDir = path.relative(process.cwd(), path.join(cwd, 'publicBuilt'));
const server = http.createServer(app);
app.engine('ejs', require('ejs-mate'));
app.set('view engine', 'ejs');
app.set('views', relquire.resolve('~/views'));

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(assets({
  paths: [
    path.join(cwd, 'public/css'),
    path.join(cwd, 'public/js')
  ],
  servePath: '/public/app'
}));

routes.map(function init(routeInit) {
  routeInit(app);
});

server.listen(8080);
console.log('app listening on port: 8080');

module.exports = server;
