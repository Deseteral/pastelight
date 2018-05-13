import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Store } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { AppContainer } from 'react-hot-loader';
import reducer, { AppState } from './reducer';

const sagaMiddleware = createSagaMiddleware();
const store: Store<AppState> = createStore(
  reducer,
  window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__'](), // eslint-disable-line
  applyMiddleware(sagaMiddleware),
);

// sagaMiddleware.run(saga);

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
