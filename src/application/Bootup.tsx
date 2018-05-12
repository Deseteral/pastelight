import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Store } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import reducer, { AppState } from './reducer';

const storeEnhancer = window['devToolsExtension'] // eslint-disable-line dot-notation
  ? window['devToolsExtension']()(createStore) // eslint-disable-line dot-notation
  : createStore;

const store: Store<AppState> = storeEnhancer(reducer);

function render() {
  const App = require('./components/App').default; // eslint-disable-line global-require

  ReactDOM.render(
    <AppContainer>
      <App store={store} />
    </AppContainer>,
    document.getElementById('root'),
  );
}

export default {
  render,
};
