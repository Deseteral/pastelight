import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom';
import { ipcRenderer } from 'electron';
import { Storage } from '../storage';
import { AppContainer, getPlatform } from '../application';
import { WelcomeScreen } from '../welcome-screen';

function setPlatformDataAttribute() {
  document.body.dataset.platform = getPlatform();
}

async function setStoragePath() {
  const userDataPath: string = await ipcRenderer.invoke('app-get-path', 'userData'); // TODO: Put this inside a IPC service 
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

  ReactDOM.render(<WelcomeScreen />, document.getElementById('root'));
}

export {
  renderApp,
  renderWelcomeScreen,
};

// TODO: Logging
