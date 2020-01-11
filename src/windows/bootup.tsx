import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../application';
import { WelcomeScreen } from '../welcome-screen';

function renderApp() {
  ReactDOM.render(<App />, document.getElementById('root'));
}

function renderWelcomeScreen() {
  ReactDOM.render(<WelcomeScreen />, document.getElementById('root'));
}

export {
  renderApp,
  renderWelcomeScreen,
};

// TODO: Logging
