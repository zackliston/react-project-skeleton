#!/bin/bash
cd ..
# Get project name
echo "Project name: "
read name
cp -R ./react-project-skeleton/project $name
cd $name

# Initialize project
npm init

# Install dependencies
npm install --save argparse babel-plugin-transform-object-rest-spread babel-preset-es2015 babel-preset-react babelify browserify body-parser connect-assets express ejs-mate envify es5-shim mkdirp morgan node-sass react react-addons-pure-render-mixin react-dom react-redux redux relquire uglifyify watchify

# Install dev dependencies
npm install --save-dev eslint eslint-config-airbnb eslint-config-react nodemon mocha istanbul


# Install temporary json parser for editing p.json
npm install json

# Add scripts
node ./node_modules/json/lib/json.js -I -f package.json -e 'this.scripts.build="npm install && mkdirp public/css public/js && node _bundler"'
node ./node_modules/json/lib/json.js -I -f package.json -e 'this.scripts.dev="nodemon index.js --ignore public/ --ignore app/ --ignore node_modules/ & node _bundler -w -m"'
node ./node_modules/json/lib/json.js -I -f package.json -e 'this.scripts.start="node server"'
node ./node_modules/json/lib/json.js -I -f package.json -e 'this.scripts.test="node node_modules/mocha/bin/mocha ./test --recursive"'
node ./node_modules/json/lib/json.js -I -f package.json -e 'this.scripts.coverage="./node_modules/istanbul/lib/cli.js cover --dir=artifacts --report=json-summary --report=html _mocha ./test -- --recursive"'
node ./node_modules/json/lib/json.js -I -f package.json -e 'this.browserify={}'
node ./node_modules/json/lib/json.js -I -f package.json -e 'this.browserify.transform=["envify", ["babelify", {"presets": ["react", "es2015"], "plugins": ["transform-object-rest-spread"]}]]'

# Remove temporary json parser
npm uninstall json
npm run build
echo "To run, type 'npm run dev' into your terminal and navigate your browser to http://localhost:8080"
