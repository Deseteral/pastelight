import { BrowserWindow } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { isDevMode } from '../../application';

let welcomeScreenWindow: (BrowserWindow | null);

async function createWelcomeScreenWindow() {
  welcomeScreenWindow = new BrowserWindow({
    title: 'pastelight',
    width: 800,
    height: 480,
    show: false,
    center: true,
    resizable: false,
    maximizable: false,
    fullscreen: false,
    fullscreenable: false,
    titleBarStyle: 'hidden',
    vibrancy: 'under-window',
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

  welcomeScreenWindow.once('ready-to-show', () => {
    (welcomeScreenWindow as BrowserWindow).show();
  });
}

export default createWelcomeScreenWindow;
