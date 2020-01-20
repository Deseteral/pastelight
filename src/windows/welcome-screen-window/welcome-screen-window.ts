import { BrowserWindow, app, BrowserWindowConstructorOptions } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { isDevMode, getPlatform } from '../../application';

let welcomeScreenWindow: (BrowserWindow | null);

async function createWelcomeScreenWindow() {
  const framelessOptions: BrowserWindowConstructorOptions = (getPlatform() === 'mac')
    ? { titleBarStyle: 'hidden', vibrancy: 'under-window' }
    : { frame: false, transparent: true };

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
    ...framelessOptions,
    webPreferences: { nodeIntegration: true },
  });
  welcomeScreenWindow.loadURL(`file://${__dirname}/welcome-screen-window.html`);

  // TODO: Make correct menu for this window

  if (isDevMode()) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    welcomeScreenWindow.webContents.openDevTools();
  }

  welcomeScreenWindow.on('closed', () => {
    welcomeScreenWindow = null;
    app.quit();
  });

  welcomeScreenWindow.once('ready-to-show', () => {
    (welcomeScreenWindow as BrowserWindow).show();
  });

  return welcomeScreenWindow;
}

export default createWelcomeScreenWindow;
