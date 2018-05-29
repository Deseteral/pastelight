import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { AppContainer } from 'react-hot-loader';
import reducer from './reducer';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
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

export { render };
