import { BrowserWindow } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
import { getAppConfig } from '../application/Configuration';

let mainWindow: (Electron.BrowserWindow | null) = null;

if (getAppConfig().isDevMode) {
  enableLiveReload({ strategy: 'react-hmr' });
}

async function create() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  mainWindow.loadURL(`file://${__dirname}/MainWindow.html`);

  if (getAppConfig().isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

export default {
  create,
};
