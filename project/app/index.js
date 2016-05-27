require('es5-shim/es5-shim.min');
require('es5-shim/es5-sham.min');

import React from 'react';
import ReactDOM from 'react-dom';
import {
  createStore
} from 'redux';
import { Provider } from 'react-redux';

import app from './reducers/app';
const store = createStore(app);

ReactDOM.render(
  <Provider store={store}>
    <div className="react-body">
      {'Hello from your react app'}
    </div>
  </Provider>,
  global.document.querySelectorAll('.attach')[0]
);
