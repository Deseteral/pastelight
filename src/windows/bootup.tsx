import path from 'path';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { AppService } from '../application/app-service';
import { Storage } from '../storage/storage';
import { WelcomeScreen } from '../welcome-screen/components/WelcomeScreen';
import { AppContainer } from '../application/components/AppContainer';

function setPlatformDataAttribute(): void {
  document.body.dataset.platform = AppService.getPlatform();
}

async function setStoragePath(): Promise<void> {
  const userDataPath: string = await AppService.getPath('userData');
  await Storage.process.setAndCreateDataPath(path.join(userDataPath, 'storage'));
}

async function renderApp(): Promise<void> {
  await setStoragePath();
  setPlatformDataAttribute();

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<AppContainer />);
}

async function renderWelcomeScreen(): Promise<void> {
  await setStoragePath();
  setPlatformDataAttribute();

  const appVersion = await AppService.getAppVersion();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<WelcomeScreen appVersion={appVersion} />);
}

export {
  renderApp,
  renderWelcomeScreen,
};

// TODO: Logging
