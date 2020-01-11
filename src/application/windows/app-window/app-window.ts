import { BrowserWindow } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import isDevMode from '../../is-dev-mode';

let appWindow = null;

async function createAppWindow() {
  appWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true },
  });


  appWindow.loadURL(`file://${__dirname}/app-window.html`);
  if (isDevMode()) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    appWindow.webContents.openDevTools();
  }

  appWindow.on('closed', () => {
    appWindow = null;
  });
}

export default createAppWindow;
