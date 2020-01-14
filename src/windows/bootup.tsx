import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom';
import { remote } from 'electron';
import { Storage } from '../storage';
import { App } from '../application';
import { WelcomeScreen } from '../welcome-screen';

function renderApp() {
  ReactDOM.render(<App />, document.getElementById('root'));
}

function renderWelcomeScreen() {
  Storage.global.setDataPath(path.join(remote.app.getPath('userData'), 'storage'));
  ReactDOM.render(<WelcomeScreen />, document.getElementById('root'));
}

export {
  renderApp,
  renderWelcomeScreen,
};

// TODO: Logging
