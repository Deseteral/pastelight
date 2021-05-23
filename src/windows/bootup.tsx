import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom';
import AppService from '../application/app-service';
import { Storage } from '../storage';
import { WelcomeScreen } from '../welcome-screen';
import AppContainer from '../application/components/AppContainer';

function setPlatformDataAttribute() {
  document.body.dataset.platform = AppService.getPlatform();
}

async function setStoragePath() {
  const userDataPath: string = await AppService.getPath('userData');
  await Storage.process.setAndCreateDataPath(path.join(userDataPath, 'storage'));
}

async function renderApp() {
  await setStoragePath();
  setPlatformDataAttribute();

  ReactDOM.render(<AppContainer />, document.getElementById('root'));
}

async function renderWelcomeScreen() {
  await setStoragePath();
  setPlatformDataAttribute();

  const appVersion = await AppService.getAppVersion();
  ReactDOM.render(<WelcomeScreen appVersion={appVersion} />, document.getElementById('root'));
}

export {
  renderApp,
  renderWelcomeScreen,
};

// TODO: Logging
