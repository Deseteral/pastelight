import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Store } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { libraryPathLoaded } from '../library/actions/library-path';
import reducer, { AppState } from './reducer';

const storeEnhancer = window['devToolsExtension']
  ? window['devToolsExtension']()(createStore)
  : createStore;

const store: Store<AppState> = storeEnhancer(reducer);

function render() {
  const App = require('./components/App').default;

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
