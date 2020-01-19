import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom';
import { remote } from 'electron';
import { Storage } from '../storage';
import { App, getPlatform } from '../application';
import { WelcomeScreen } from '../welcome-screen';

function setPlatformDataAttribute() {
  document.body.dataset.platform = getPlatform();
}

function setStoragePath() {
  Storage.process.setDataPath(path.join(remote.app.getPath('userData'), 'storage'));
}

function renderApp() {
  setStoragePath();
  setPlatformDataAttribute();

  ReactDOM.render(<App />, document.getElementById('root'));
}

function renderWelcomeScreen() {
  setStoragePath();
  setPlatformDataAttribute();

  ReactDOM.render(<WelcomeScreen />, document.getElementById('root'));
}

export {
  renderApp,
  renderWelcomeScreen,
};

// TODO: Logging
