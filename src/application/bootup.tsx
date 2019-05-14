import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, Store } from 'redux';
import reducer, { AppState } from './reducer';
import App from './components/App';

// @ts-ignore
const reduxDevTools = window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__'](); // eslint-disable-line

const store: Store<AppState> = createStore(
  reducer,
  reduxDevTools,
);

function render() {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root'),
  );
}

export { render };

// TODO: Logging
