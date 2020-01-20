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

async function setStoragePath() {
  await Storage.process.setAndCreateDataPath(path.join(remote.app.getPath('userData'), 'storage'));
}

async function renderApp() {
  await setStoragePath();
  setPlatformDataAttribute();

  ReactDOM.render(<App />, document.getElementById('root'));
}

async function renderWelcomeScreen() {
  await setStoragePath();
  setPlatformDataAttribute();

  ReactDOM.render(<WelcomeScreen />, document.getElementById('root'));
}

export {
  renderApp,
  renderWelcomeScreen,
};

// TODO: Logging
