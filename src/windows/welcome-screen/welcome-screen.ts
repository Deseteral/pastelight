import { BrowserWindow } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { isDevMode } from '../../application';

let welcomeScreenWindow = null;

async function createWelcomeScreenWindow() {
  welcomeScreenWindow = new BrowserWindow({
    width: 640,
    height: 480,
    webPreferences: { nodeIntegration: true },
  });
  welcomeScreenWindow.loadURL(`file://${__dirname}/welcome-screen.html`);

  if (isDevMode()) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    welcomeScreenWindow.webContents.openDevTools();
  }

  welcomeScreenWindow.on('closed', () => {
    welcomeScreenWindow = null;
  });
}

export default createWelcomeScreenWindow;
