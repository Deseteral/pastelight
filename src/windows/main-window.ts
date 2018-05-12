import { BrowserWindow } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
import { getAppConfig } from '../application/configuration';

let mainWindow: (Electron.BrowserWindow | null) = null;

if (getAppConfig().isDevMode) {
  enableLiveReload({ strategy: 'react-hmr' });
}

async function create() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  mainWindow.loadURL(`file://${__dirname}/main-window.html`);

  if (getAppConfig().isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    await installExtension(REDUX_DEVTOOLS);
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

export default {
  create,
};
